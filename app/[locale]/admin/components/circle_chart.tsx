import { useEffect, useState } from "react";

interface propsType {
	data: { name: string; value: number; color: string }[];
	product?: string;
}
export default function CircleChart({ data, product = "" }: propsType) {
	const [total, setTotal] = useState<number>(data.reduce((p, c) => p + c.value, 0));
	const [percentages, setPercentages] = useState<number[]>(data.map(() => 0));
	useEffect(() => {
		const newP: number[] = [];
		setTimeout(() => {
			const eachP = data.map(({ value }) => Math.round((value / total) * 100));
			for (let i = 0; i < eachP.length; i++) newP.push(eachP[i] + (newP[newP.length - 1] || 0));
			setPercentages(newP);
		}, 0);
	}, []);
	return (
		<div className="flex justify-center items-start gap-5 flex-col p-10 bg-(--clr-surface2) border border-(--clr-surface-light2) rounded-2xl h-full">
			<div>
				<h1 className="text-2xl font-bold">Node Distrobution</h1>
				<h3 className="text_shine">Active servers by region</h3>
			</div>

			<div className="font-bold text-2xl w-4/5 min-w-[250px] aspect-square flex justify-center items-center rounded-full relative">
				{/* <div className="absolute left-1/2 top-1/2 -translate-1/2  aspect-square w-[calc(100%+25px)] rounded-full" style={{ background: `conic-gradient(#0ea5e9 0% 45%, #8b5cf6 45% 70%, #06b6d4 70% 90%, #475569 90% 100%)` }}></div> */}
				<div
					className="absolute left-1/2 top-1/2 -translate-1/2  aspect-square w-full rounded-full transition"
					style={{
						background: `conic-gradient(${data.map((e, j) => {
							return percentages.reduce((p, c) => p + c, 0) == 0 ? `rgba(255, 255, 255, 0.7) 0% 100%` : `${e.color} ${percentages[j - 1] || 0}% ${percentages[j]}%`;
						})})`,
					}}
				></div>
				<div className="absolute left-1/2 top-1/2 -translate-1/2 w-[calc(100%-50px)] aspect-square flex justify-center items-center rounded-full bg-(--clr-surface2)">{format(total) + " " + product}</div>
			</div>
			<div className="w-full flex justify-evenly items-center flex-wrap gap-4">
				{data.map((e) => (
					<div key={e.color + e.value} className="w-[calc(50%-16px)] flex justify-start items-center gap-2">
						<div className="w-4 aspect-square rounded-full" style={{ backgroundColor: e.color }}></div>
						<div>
							<p className="font-bold text-xs">{e.name}</p>
							<p className="text-gray-500 text-xs">{((e.value / total) * 100).toFixed(2)}%</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function format(v: number): string {
	let result = v.toString();
	if (v >= 1e9) return (result = (v / 1e9).toFixed(2) + "B");
	if (v >= 1e6) return (result = (v / 1e6).toFixed(2) + "M");
	if (v >= 1e3) return (result = (v / 1e3).toFixed(2) + "K");

	return result;
}
