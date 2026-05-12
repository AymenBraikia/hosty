"use client";
import { useState } from "react";
import Services from "./services";
interface service {
	type: "Cloud VPS" | "Cloud VDS" | "Dedicated Server";
	cpu: number;
	ram: number;
	bandwidth: string;
	storage: string;
	id: number;
	title?: string;
	price: number;
	discount?: number;
	mostPopular?: boolean;
}
export default function Body({ services }: { services: service[] }) {
	const [filter, setFilter] = useState<"All" | "Cloud VPS" | "Cloud VDS" | "Dedicated Server">("All");

	return (
		<section className="w-dvw min-h-dvh flex flex-col justify-start items-center p-32">
			<h1 className="font-bold text-5xl my-2">Cloud Services & VPS</h1>
			<p className="text_shine text-xl">Deploy high-performance instances in seconds.</p>
			<div className="flex justify-center items-center border border-(--clr-surface-light2) bg-(--clr-surface) rounded-xl relative overflow-hidden px-2.5 mt-10">
				<div className={`cursor-pointer min-w-16 px-2 text-center py-2.5 font-bold ${filter == "All" ? "text-foreground" : "text-gray-400"} z-10`} onClick={() => setFilter("All")}>
					All
				</div>
				<div className={`cursor-pointer min-w-16 px-2 text-center py-2.5 font-bold ${filter == "Cloud VPS" ? "text-foreground" : "text-gray-400"} z-10`} onClick={() => setFilter("Cloud VPS")}>
					VPS
				</div>
				<div className={`cursor-pointer min-w-16 px-2 text-center py-2.5 font-bold ${filter == "Cloud VDS" ? "text-foreground" : "text-gray-400"} z-10`} onClick={() => setFilter("Cloud VDS")}>
					VDS
				</div>
				<div className={`cursor-pointer min-w-16 px-2 text-center py-2.5 font-bold ${filter == "Dedicated Server" ? "text-foreground" : "text-gray-400"} z-10`} onClick={() => setFilter("Dedicated Server")}>
					Dedicated
				</div>
				<div className={`absolute transition ${filter == "All" ? "w-18 left-1.5" : filter == "Cloud VPS" ? "w-18 left-17.5" : filter == "Cloud VDS" ? "w-18 left-33.5" : "w-25 left-49.5"} top-1/2 -translate-y-1/2 bg_anim  h-10/12 rounded-xl`}></div>
			</div>
			<Services services={services} filter={filter} />
		</section>
	);
}
