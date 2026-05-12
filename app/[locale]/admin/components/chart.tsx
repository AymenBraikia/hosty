"use client";

import { useEffect, useRef } from "react";

interface LineChartProps {
	title?: string;
	subtitle?: string;
	prefix?: string;
	data: number[];
	labels: string[];
}

const TICKS = 10;
const PAD = { l: 72, r: 24, t: 20, b: 44 };

function smoothPath(ctx: CanvasRenderingContext2D, pts: { x: number; y: number }[]) {
	if (pts.length < 2) return;
	ctx.moveTo(pts[0].x, pts[0].y);
	for (let i = 0; i < pts.length - 1; i++) {
		const p0 = pts[Math.max(i - 1, 0)];
		const p1 = pts[i];
		const p2 = pts[i + 1];
		const p3 = pts[Math.min(i + 2, pts.length - 1)];
		ctx.bezierCurveTo(p1.x + (p2.x - p0.x) / 6, p1.y + (p2.y - p0.y) / 6, p2.x - (p3.x - p1.x) / 6, p2.y - (p3.y - p1.y) / 6, p2.x, p2.y);
	}
}

function fmtY(v: number) {
	if (v === 0) return "0";
	if (v >= 1e6) return `${(v / 1e6) % 1 === 0 ? v / 1e6 : (v / 1e6).toFixed(1)}m`;
	if (v >= 1e3) return `${(v / 1e3) % 1 === 0 ? v / 1e3 : (v / 1e3).toFixed(1)}k`;
	return v.toString();
}

function niceMax(max: number, ticks: number) {
	const step = Math.ceil(max / (ticks - 1) / 1000) * 1000;
	return step * (ticks - 1);
}

export default function LineChart({ prefix, title, subtitle, data, labels }: LineChartProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const dpr = window.devicePixelRatio || 1;
		const W = canvas.offsetWidth;
		const H = canvas.offsetHeight;
		canvas.width = W * dpr;
		canvas.height = H * dpr;

		const ctx = canvas.getContext("2d")!;
		ctx.scale(dpr, dpr);

		const CW = W - PAD.l - PAD.r;
		const CH = H - PAD.t - PAD.b;
		const maxVal = niceMax(Math.max(...data), TICKS);
		const tickStep = maxVal / (TICKS - 1);

		const pts = data.map((v, i) => ({
			x: PAD.l + (i / (data.length - 1)) * CW,
			y: PAD.t + CH - (v / maxVal) * CH,
		}));

		// --- Grid lines + Y labels ---
		ctx.font = "12px system-ui";
		ctx.textAlign = "right";
		ctx.textBaseline = "middle";
		for (let i = 0; i < TICKS; i++) {
			const val = tickStep * (TICKS - 1 - i);
			const y = PAD.t + (i / (TICKS - 1)) * CH;

			ctx.strokeStyle = "rgba(255,255,255,0.07)";
			ctx.lineWidth = 1;
			ctx.setLineDash([5, 5]);
			ctx.beginPath();
			ctx.moveTo(PAD.l, y);
			ctx.lineTo(W - PAD.r, y);
			ctx.stroke();
			ctx.setLineDash([]);

			ctx.fillStyle = "rgba(255,255,255,0.35)";
			ctx.fillText(prefix ? prefix + fmtY(val) : fmtY(val), PAD.l - 10, y);
		}

		// --- X labels ---
		ctx.textAlign = "center";
		ctx.textBaseline = "bottom";
		ctx.fillStyle = "rgba(255,255,255,0.35)";
		labels.forEach((l, i) => {
			const x = PAD.l + (i / (labels.length - 1)) * CW;
			ctx.fillText(l, x, H - 4);
		});

		// --- Area fill ---
		const areaGrad = ctx.createLinearGradient(0, PAD.t, 0, PAD.t + CH);
		areaGrad.addColorStop(0, "rgba(56,189,248,0.22)");
		areaGrad.addColorStop(1, "rgba(56,189,248,0)");
		ctx.fillStyle = areaGrad;
		ctx.beginPath();
		smoothPath(ctx, pts);
		ctx.lineTo(pts.at(-1)!.x, PAD.t + CH);
		ctx.lineTo(pts[0].x, PAD.t + CH);
		ctx.closePath();
		ctx.fill();

		// --- Line ---
		const lineGrad = ctx.createLinearGradient(PAD.l, 0, W - PAD.r, 0);
		lineGrad.addColorStop(0, "#38bdf8");
		lineGrad.addColorStop(0.55, "#818cf8");
		lineGrad.addColorStop(1, "#c084fc");
		ctx.strokeStyle = lineGrad;
		ctx.lineWidth = 2.5;
		ctx.lineJoin = "round";
		ctx.lineCap = "round";
		ctx.beginPath();
		smoothPath(ctx, pts);
		ctx.stroke();

		// --- Dots ---
		pts.forEach((p) => {
			// glow ring
			ctx.beginPath();
			ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
			ctx.fillStyle = "rgba(56,189,248,0.12)";
			ctx.fill();
			// hollow circle
			ctx.beginPath();
			ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
			ctx.fillStyle = "#0f1117"; // match your --clr-surface
			ctx.fill();
			ctx.strokeStyle = "#38bdf8";
			ctx.lineWidth = 1.8;
			ctx.stroke();
		});
	}, [data, labels]);

	return (
		<div className="w-full bg-(--clr-surface2) rounded-2xl border border-(--clr-surface-light2) p-6 select-none">
			<div className="flex justify-between items-start mb-4">
				<div>
					<h2 className="text-xl font-bold">{title}</h2>
					<p className="text-sm opacity-40">{subtitle}</p>
				</div>
			</div>
			<canvas ref={canvasRef} className="w-full h-72" />
		</div>
	);
}
