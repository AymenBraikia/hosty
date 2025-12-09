import { useState } from "react";
import Button from "./button";
import Cpu from "./svg/cpu";
import DataBase from "./svg/database";
import Thunder from "./svg/thunder";
import Shield from "./svg/shield";
import Storage from "./svg/storage";

type plan = {
	name: string;
	pricing: { m: number; y: number };
	popular: boolean;
	specs: { cpu: number; ram: number; storage: string; bandWidth: string; ssl_cdn: boolean };
};

const plans: plan[] = [
	{
		name: "Basic",
		pricing: { m: 4.99, y: 3.99 },
		popular: false,
		specs: {
			cpu: 1,
			ram: 2,
			storage: "50 GB NVMe",
			bandWidth: "2 TB Traffic",
			ssl_cdn: true,
		},
	},
	{
		name: "Pro",
		pricing: { m: 12.99, y: 9.99 },
		popular: true,
		specs: {
			cpu: 4,
			ram: 8,
			storage: "200 GB NVMe",
			bandWidth: "8 TB Traffic",
			ssl_cdn: true,
		},
	},
	{
		name: "Elite",
		pricing: { m: 34.99, y: 29.99 },
		popular: false,
		specs: {
			cpu: 8,
			ram: 32,
			storage: "1TB NVMe",
			bandWidth: "Unlimited Traffic",
			ssl_cdn: true,
		},
	},
];

export default function Pricing() {
	const [plan, setPlan] = useState<"m" | "y">("m");
	return (
		<div className="w-dvw min-h-dvh box-content flex flex-col justify-center items-center gap-8 pb-16">
			<h1 className="text-5xl font-black">Simple, Transparent Pricing</h1>
			<div className="p-2 border border-(--clr-surface-light) flex justify-center items-center bg-(--clr-surface2) rounded-full relative">
				<Button
					action={() => setPlan("m")}
					css={`
						${plan == "m" ? "text-foreground" : "text-gray-400"} py-2 z-10
					`}
					content="Monthly"
				/>
				<Button
					action={() => setPlan("y")}
					css={`
						${plan == "y" ? "text-foreground" : "text-gray-400"} py-2 z-10 gap-2 flex
					`}
					content="Yearly"
					children_el={<span className="text-(--clr-accent)">-20%</span>}
				/>
				<div className={`transition bg-(--clr-surface-light) ${plan == "m" ? "left-2 w-22" : "left-23 w-30"} h-12 rounded-full absolute top-1/2 -translate-y-1/2`}></div>
			</div>
			<div className="flex flex-wrap justify-center items-center gap-10 w-dvw">
				{plans.map((p, i) => (
					<Plan key={i} p={p} plan={plan} />
				))}
			</div>
		</div>
	);
}

function Plan(props: { p: plan; plan: "m" | "y" }) {
	const info = props.p;
	return (
		<div
			className={`relative cursor-pointer overflow-hidden transition bg-(--clr-surface) hover:bg-(--clr-surface-light) rounded-4xl w-[25%] flex flex-col gap-5 justify-center items-start p-8 hover:-translate-y-2 ${
				info.popular ? "scale-105 border-gradient" : "border border-(--clr-surface-light2)"
			}`}
		>
			{info.popular && <span className="absolute left-1/2 top-6 -translate-1/2 bg_anim px-4 py-1.5 rounded-full font-black text-xs min-w-fit text-center">MOST POPULAR</span>}
			<div className="w-full flex justify-between items-center">
				<div className="flex flex-col">
					<h3 className="text-2xl font-black">{info.name}</h3>
					<h3 className="text-gray-400 text-[14px] font-medium">HOSTY CLOUD</h3>
				</div>

				<div className={`${info.popular ? "bg-(--clr-accent-opacity)" : "bg-(--clr-background-opacity)"} p-2.5 rounded-full`}>
					<Cpu s={23} color={info.popular ? "var(--clr-accent)" : "var(--background3)"} />
				</div>
			</div>
			<h1 className="text-5xl font-black">
				${props.plan == "m" ? info.pricing.m : info.pricing.y}
				<span className="text-gray-500 text-2xl m-2 font-medium">/mo</span>
			</h1>
			<div className="w-full border border-dashed border-(--clr-surface-light2) brightness-150"></div>

			<div className="flex flex-col gap-3 justify-center items-start text-gray-400">
				<div className="flex gap-2 justify-start items-center font-bold">
					<Cpu color={info.popular ? "var(--clr-accent)" : "var(--clr-primary)"} s={18} />
					<p>{info.specs.cpu} vCPU</p>
				</div>
				<div className="flex gap-2 justify-start items-center font-bold">
					<DataBase color={info.popular ? "var(--clr-accent)" : "var(--clr-primary)"} s={18} />
					<p>{info.specs.ram} GB RAM</p>
				</div>
				<div className="flex gap-2 justify-start items-center font-bold">
					<Storage color={info.popular ? "var(--clr-accent)" : "var(--clr-primary)"} s={18} />
					<p>{info.specs.storage}</p>
				</div>
				<div className="flex gap-2 justify-start items-center font-bold">
					<Thunder color={info.popular ? "var(--clr-accent)" : "var(--clr-primary)"} s={18} />
					<p>{info.specs.bandWidth}</p>
				</div>
				{info.specs.ssl_cdn && (
					<div className="flex gap-2 justify-start items-center font-bold">
						<Shield color={info.popular ? "var(--clr-accent)" : "var(--clr-primary)"} s={18} />
						<p>Free SSL & CDN</p>
					</div>
				)}
			</div>
			<Button
				css={`
					${info.popular && "bg_anim"} plan_btn flex justify-center items-center gap-2 w-full
				`}
				content="Choose Plan"
			/>
			{info.popular && <div className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 bg-(--clr-accent2) w-xs aspect-square -z-10 rounded-full blur-[200px]"></div>}
		</div>
	);
}
