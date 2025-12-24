"use client";
import { useState } from "react";
import Button from "../components/button";
import Star2 from "../components/svg/star2";
import Cpu from "../components/svg/cpu";

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
let i = 0;

const services: service[] = [
	// =====================
	// Cloud VPS (by price)
	// =====================
	{ type: "Cloud VPS", id: i++, cpu: 1, ram: 1, bandwidth: "1 TB", storage: "25GB SSD", price: 4.99 },
	{ type: "Cloud VPS", id: i++, cpu: 1, ram: 2, bandwidth: "1 TB", storage: "25GB SSD", price: 5.49 },
	{ type: "Cloud VPS", id: i++, cpu: 1, ram: 2, bandwidth: "2 TB", storage: "40GB SSD", price: 6.99 },
	{ type: "Cloud VPS", id: i++, cpu: 2, ram: 4, bandwidth: "2 TB", storage: "50GB SSD", price: 7.99 },
	{ type: "Cloud VPS", id: i++, cpu: 2, ram: 2, bandwidth: "2 TB", storage: "50GB SSD", price: 8.99 },
	{ type: "Cloud VPS", id: i++, cpu: 2, ram: 4, bandwidth: "3 TB", storage: "80GB SSD", price: 9.99, discount: 20, title: "Starter Deal" },
	{ type: "Cloud VPS", id: i++, cpu: 2, ram: 4, bandwidth: "3 TB", storage: "80GB SSD", price: 11.99 },
	{ type: "Cloud VPS", id: i++, cpu: 4, ram: 4, bandwidth: "4 TB", storage: "120GB SSD", price: 15.99 },
	{ type: "Cloud VPS", id: i++, cpu: 4, ram: 4, bandwidth: "4 TB", storage: "120GB SSD", price: 15.99 },
	{ type: "Cloud VPS", id: i++, cpu: 4, ram: 8, bandwidth: "5 TB", storage: "160GB SSD", price: 17.99, discount: 15, title: "Popular Choice" },
	{ type: "Cloud VPS", id: i++, cpu: 4, ram: 8, bandwidth: "5 TB", storage: "160GB SSD", price: 19.99, mostPopular: true },
	{ type: "Cloud VPS", id: i++, cpu: 6, ram: 8, bandwidth: "6 TB", storage: "200GB SSD", price: 24.99 },
	{ type: "Cloud VPS", id: i++, cpu: 6, ram: 8, bandwidth: "6 TB", storage: "200GB SSD", price: 24.99 },
	{ type: "Cloud VPS", id: i++, cpu: 8, ram: 16, bandwidth: "8 TB", storage: "250GB SSD", price: 34.99, mostPopular: true },
	{ type: "Cloud VPS", id: i++, cpu: 8, ram: 16, bandwidth: "8 TB", storage: "250GB SSD", price: 34.99 },
	{ type: "Cloud VPS", id: i++, cpu: 12, ram: 24, bandwidth: "10 TB", storage: "320GB SSD", price: 49.99 },
	{ type: "Cloud VPS", id: i++, cpu: 12, ram: 24, bandwidth: "10 TB", storage: "320GB SSD", price: 49.99 },
	{ type: "Cloud VPS", id: i++, cpu: 16, ram: 32, bandwidth: "12 TB", storage: "400GB SSD", price: 69.99 },

	// =====================
	// Cloud VDS (by price)
	// =====================
	{ type: "Cloud VDS", id: i++, cpu: 4, ram: 8, bandwidth: "5 TB", storage: "200GB NVMe", price: 39.99 },
	{ type: "Cloud VDS", id: i++, cpu: 6, ram: 12, bandwidth: "6 TB", storage: "250GB NVMe", price: 49.99 },
	{ type: "Cloud VDS", id: i++, cpu: 8, ram: 16, bandwidth: "8 TB", storage: "320GB NVMe", price: 54.99, discount: 10, title: "Best Value" },
	{ type: "Cloud VDS", id: i++, cpu: 8, ram: 16, bandwidth: "8 TB", storage: "320GB NVMe", price: 59.99, mostPopular: true },
	{ type: "Cloud VDS", id: i++, cpu: 10, ram: 20, bandwidth: "10 TB", storage: "400GB NVMe", price: 74.99 },
	{ type: "Cloud VDS", id: i++, cpu: 12, ram: 24, bandwidth: "12 TB", storage: "500GB NVMe", price: 89.99 },
	{ type: "Cloud VDS", id: i++, cpu: 12, ram: 24, bandwidth: "12 TB", storage: "500GB NVMe", price: 89.99 },
	{ type: "Cloud VDS", id: i++, cpu: 16, ram: 32, bandwidth: "15 TB", storage: "640GB NVMe", price: 119.99, mostPopular: true },
	{ type: "Cloud VDS", id: i++, cpu: 16, ram: 32, bandwidth: "15 TB", storage: "640GB NVMe", price: 119.99 },
	{ type: "Cloud VDS", id: i++, cpu: 20, ram: 48, bandwidth: "18 TB", storage: "800GB NVMe", price: 149.99 },
	{ type: "Cloud VDS", id: i++, cpu: 24, ram: 64, bandwidth: "20 TB", storage: "1TB NVMe", price: 179.99 },
	{ type: "Cloud VDS", id: i++, cpu: 24, ram: 64, bandwidth: "20 TB", storage: "1TB NVMe", price: 179.99 },
	{ type: "Cloud VDS", id: i++, cpu: 32, ram: 96, bandwidth: "25 TB", storage: "1.5TB NVMe", price: 249.99 },
	{ type: "Cloud VDS", id: i++, cpu: 40, ram: 128, bandwidth: "30 TB", storage: "2TB NVMe", price: 329.99 },

	// =========================
	// Dedicated Server (by price)
	// =========================
	{ type: "Dedicated Server", id: i++, cpu: 8, ram: 16, bandwidth: "10 TB", storage: "1TB HDD", price: 79.99 },
	{ type: "Dedicated Server", id: i++, cpu: 8, ram: 32, bandwidth: "12 TB", storage: "2TB HDD", price: 99.99, mostPopular: true },
	{ type: "Dedicated Server", id: i++, cpu: 12, ram: 32, bandwidth: "15 TB", storage: "2×1TB HDD", price: 129.99 },
	{ type: "Dedicated Server", id: i++, cpu: 16, ram: 64, bandwidth: "20 TB", storage: "2×480GB SSD", price: 159.99, discount: 20, title: "Limited Offer", mostPopular: true },
	{ type: "Dedicated Server", id: i++, cpu: 16, ram: 64, bandwidth: "20 TB", storage: "2×480GB SSD", price: 169.99 },
	{ type: "Dedicated Server", id: i++, cpu: 24, ram: 64, bandwidth: "25 TB", storage: "2×480GB SSD", price: 199.99 },
	{ type: "Dedicated Server", id: i++, cpu: 24, ram: 64, bandwidth: "25 TB", storage: "2×480GB SSD", price: 199.99 },
	{ type: "Dedicated Server", id: i++, cpu: 32, ram: 128, bandwidth: "30 TB", storage: "2×960GB SSD", price: 229.99, discount: 25, title: "Enterprise Deal" },
	{ type: "Dedicated Server", id: i++, cpu: 40, ram: 128, bandwidth: "35 TB", storage: "2×1TB NVMe", price: 299.99 },
	{ type: "Dedicated Server", id: i++, cpu: 40, ram: 128, bandwidth: "35 TB", storage: "2×1TB NVMe", price: 299.99 },
	{ type: "Dedicated Server", id: i++, cpu: 32, ram: 128, bandwidth: "30 TB", storage: "2TB NVMe", price: 329.99 },
	{ type: "Dedicated Server", id: i++, cpu: 48, ram: 192, bandwidth: "40 TB", storage: "2×2TB NVMe", price: 369.99 },
	{ type: "Dedicated Server", id: i++, cpu: 56, ram: 256, bandwidth: "50 TB", storage: "4TB NVMe", price: 449.99 },
	{ type: "Dedicated Server", id: i++, cpu: 64, ram: 512, bandwidth: "60 TB", storage: "2×4TB NVMe", price: 599.99 },
];

export default function Body() {
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
			<div className="flex justify-center items-center w-full gap-8 flex-wrap my-10">
				{services.map((s, i) => (
					<div
						key={i}
						className={`w-96 min-h-96 bg-(--clr-surface) group ${!s.mostPopular && "border border-(--clr-surface-light2)"} rounded-2xl ${
							filter == "All" || filter == s.type ? "flex" : "hidden"
						} justify-center items-start flex-col p-4 relative overflow-hidden hover:border-(--clr-primary) hover:-translate-y-2.5 transition ${s.mostPopular ? "scale-100 border-gradient py-12 gap-4" : "gap-4"}`}
					>
						<h2 className="text-2xl font-black flex w-full justify-between items-center">
							{s.type}
							<div
								className={`text-gray-400 bg-gray-400/10 p-2.5 rounded-full aspect-square transition ${
									s.mostPopular ? "group-hover:text-(--clr-accent2) group-hover:bg-(--clr-accent2-opacity)" : "group-hover:text-(--clr-primary) group-hover:bg-(--clr-primary-opacity)"
								}`}
							>
								<Cpu s={25} color="currentColor" />
							</div>
						</h2>
						<h3 className="text-3xl font-black">
							${s.price}
							<span className="text-base text-gray-400 font-light">/mo</span>
						</h3>
						<div className={`flex flex-col w-full gap-2 text-gray-500 transition ${s.mostPopular ? "group-hover:text-(--clr-accent2)" : "group-hover:text-(--clr-primary)"}`}>
							<div className="flex justify-between items-center font-bold">
								CPU <span className="text-foreground font-normal">{s.cpu} vCPU</span>
							</div>
							<hr className="border-(--clr-surface-light2)" />
							<div className="flex justify-between items-center font-bold">
								RAM <span className="text-foreground font-normal">{s.ram} GB</span>
							</div>
							<hr className="border-(--clr-surface-light2)" />
							<div className="flex justify-between items-center font-bold">
								Storage <span className="text-foreground font-normal">{s.storage}</span>
							</div>
							<hr className="border-(--clr-surface-light2)" />
							<div className="flex justify-between items-center font-bold">
								Bandwidth <span className="text-foreground font-normal">{s.bandwidth}</span>
							</div>
							<hr className="border-(--clr-surface-light2)" />
						</div>
						<Button url={`/plan?id=${s.id}`} content="Deploy Now" css={`w-full text-center rounded-full cursor-pointer transition ${s.mostPopular ? "bg_anim shadow_anim" : "deploy"}`} />
						{s.mostPopular && (
							<>
								<span className="absolute left-1/2 top-5 -translate-1/2 bg_anim px-4 py-1 rounded-full font-black text-xs min-w-fit flex justify-center items-center gap-1 max-sm:text-[10px]">
									<Star2 s={16} color="white" />
									MOST POPULAR
								</span>
								<div className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 w-60 bg_anim aspect-square -z-10 rounded-full blur-[150px]"></div>
							</>
						)}
					</div>
				))}
			</div>
		</section>
	);
}
