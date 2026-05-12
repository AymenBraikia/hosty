"use client";

import { useEffect, useRef, useState } from "react";
export default function Chart({ x, y, cols }: { x?: string; y: string; cols: [number, string][] }) {
	const max = Math.max(...cols.map((e) => e[0]));
	const w = Math.floor(100 / cols.length) + "%";

	const [h, set_h] = useState<string[]>(cols.map(() => "0%"));
	const [v, set_v] = useState<number[]>(cols.map(() => 0));

	const chartEl = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			set_h(cols.map((c) => Math.floor((100 * c[0]) / max) + "%"));
			set_v(cols.map((c) => c[0]));
		}, 0);
		return () => clearTimeout(timer);
	}, []);
	// useEffect(() => {
	// 	if (!chartEl.current || swipe_x == 0) return;
	// 	chartEl.current.scrollLeft += swipe_x;
	// 	console.log(swipe_x);
	// }, [swipe_x]);

	useEffect(() => {
		const el = chartEl.current;
		if (!el) return;

		const onWheel = (e: WheelEvent) => {
			e.preventDefault();
			el.scrollBy({ left: e.deltaY, behavior: "smooth" });
		};

		el.addEventListener("wheel", onWheel, { passive: false });
		return () => el.removeEventListener("wheel", onWheel);
	}, []);

	const gap = 0;

	return (
		<div ref={chartEl} className="w-full h-[80dvh] bg-(--clr-surface2) relative rounded-2xl border border-(--clr-surface-light2) px-10 py-20 overflow-y-hidden overflow-x-auto select-none">
			{x && <div className="text-xl font-bold left-1/2 bottom-2 absolute -translate-x-1/2 text-(--clr-primary)">{x}</div>}
			<div className="font-bold left-0 top-0 absolute text-(--clr-primary) p-3 bg-(--clr-surface) rounded-br-2xl">{y}</div>
			<div className="w-full h-full flex justify-evenly items-end gap-8 relative left-6">
				{cols.map((e, i) => (
					<div key={e[1] + e[0]} style={{ width: `calc(${w} - ${gap}px)`, height: h[i] }} className={`min-w-10 max-w-20 transition-all duration-1500 ease-in-out font-bold relative ${max == v[i] ? "bg_anim2" : "bg_anim"} rounded-t-xl`}>
						<p className={`absolute left-1/2 -top-1 -translate-y-full -translate-x-1/2 ${max == v[i] ? "text_anim2" : "text_anim"}`}>{format(v[i])}</p>
						<p className={`absolute left-1/2 -bottom-1 translate-y-full -translate-x-1/2 ${max == v[i] ? "text_anim2" : "text_anim"}`}>{e[1]}</p>
					</div>
				))}
			</div>
		</div>
	);
}
function format(e: number): string {
	const num = e.toString();
	let o = "";
	for (let i = 0; i < num.length; i++) o += num[i] + ((i + 1) % 3 == 0 && num[i + 1] ? "," : "");

	return o;
}
