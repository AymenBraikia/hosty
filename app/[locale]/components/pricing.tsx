"use client"
import { useState } from "react";
import Button from "./button";
import Cpu from "./svg/cpu";
import DataBase from "./svg/database";
import Thunder from "./svg/thunder";
import Shield from "./svg/shield";
import Storage from "./svg/storage";
import Star2 from "./svg/star2";
import { useTranslations } from "next-intl";

type plan = {
	name: string;
	pricing: { m: number; y: number };
	popular: boolean;
	description: string;
	specs: { cpu: number | string; ram: number | string; storage: string; bandWidth: string; ssl_cdn: boolean };
};

export default function Pricing() {
	const t = useTranslations("pricing");
	const [plan, setPlan] = useState<"m" | "y">("m");

	const plans: plan[] = [
		{
			name: t("plans.cloudVps.name"),
			pricing: { m: 4.99, y: 3.99 },
			description: t("plans.cloudVps.description"),
			popular: false,
			specs: {
				cpu: "1-16",
				ram: "1-32",
				storage: "25 GB - 400 GB SSD",
				bandWidth: "1 TB - 12 TB Traffic",
				ssl_cdn: true,
			},
		},
		{
			name: t("plans.vdsHybrid.name"),
			pricing: { m: 39.99, y: 27.99 },
			description: t("plans.vdsHybrid.description"),
			popular: false,
			specs: {
				cpu: "4-40",
				ram: "8-128",
				storage: "200 GB - 2 TB NVMe",
				bandWidth: "5 TB - 30 Traffic",
				ssl_cdn: true,
			},
		},
		{
			name: t("plans.dedicated.name"),
			pricing: { m: 79.99, y: 55.99 },
			description: t("plans.dedicated.description"),
			popular: false,
			specs: {
				cpu: "8-64",
				ram: "16-512",
				storage: "1 TB - 2x4 TB NVMe",
				bandWidth: "10 TB - 60TB Traffic",
				ssl_cdn: true,
			},
		},
	];

	return (
		<section className="w-dvw min-h-dvh flex flex-col justify-center items-center gap-8 p-16 max-md:p-6">
			<h1 className="text-5xl font-black max-sm:text-3xl max-lg:text-4xl text-center">{t("headline")}</h1>
			<div className="p-2 border border-(--clr-surface-light) flex justify-center items-center bg-(--clr-surface2) rounded-full relative">
				<Button
					action={() => setPlan("m")}
					css={`
						${plan == "m" ? "text-foreground" : "text-gray-400"} py-2 z-10
					`}
					content={t("billing.monthly")}
				/>
				<Button
					action={() => setPlan("y")}
					css={`
						${plan == "y" ? "text-foreground" : "text-gray-400"} py-2 z-10 gap-2 flex
					`}
					content={t("billing.yearly")}
					children_el={<span className="text-(--clr-accent)">-30%</span>}
				/>
				<div className={`transition bg-(--clr-surface-light) ${plan == "m" ? "left-2 w-22" : "left-23 w-30"} h-12 rounded-full absolute top-1/2 -translate-y-1/2`}></div>
			</div>
			<div className="flex flex-wrap justify-center items-center gap-10 w-dvw max-lg:flex-col max-lg:px-8">
				{plans.map((p, i) => (
					<Plan key={i} p={p} plan={plan} />
				))}
			</div>
		</section>
	);
}

function Plan(props: { p: plan; plan: "m" | "y" }) {
	const info = props.p;
	const t = useTranslations("pricing");

	return (
		<div
			className={`relative cursor-pointer overflow-hidden transition bg-(--clr-surface) hover:bg-(--clr-surface-light) rounded-4xl w-[25%] max-lg:w-full flex flex-col gap-5 justify-center items-start p-8 hover:-translate-y-2 ${
				info.popular ? "scale-105 border-gradient" : "border border-(--clr-surface-light2)"
			}`}
		>
			{info.popular && (
				<span className="absolute left-1/2 top-5 -translate-1/2 bg_anim px-4 py-1 rounded-full font-black text-xs min-w-fit flex justify-center items-center gap-1 max-sm:text-[10px]">
					<Star2 s={16} color="white" />
					MOST POPULAR
				</span>
			)}
			<div className="w-full flex justify-between items-center">
				<div className="flex flex-col">
					<h3 className="text-2xl font-black">{info.name}</h3>
					<h3 className="text-gray-400 text-[14px] font-medium">{info.description}</h3>
				</div>

				<div className={`${info.popular ? "bg-(--clr-accent-opacity)" : "bg-(--clr-background-opacity)"} p-2.5 rounded-full`}>
					<Cpu s={23} color={info.popular ? "var(--clr-accent)" : "var(--background3)"} />
				</div>
			</div>

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
						<p>{t("labels.freeSslCdn")}</p>
					</div>
				)}
			</div>
			<h1 className="text-3xl font-black max-sm:text-3xl">
				<span className="text-gray-400 text-base font-medium">{t("labels.startingAt")} </span>${props.plan == "m" ? info.pricing.m : info.pricing.y}
				<span className="text-gray-400 text-base font-medium">/mo</span>
			</h1>
			<Button
				css={`
					${info.popular && "bg_anim"} plan_btn flex justify-center items-center gap-2 w-full
				`}
				content={t("labels.choosePlan")}
			/>

			{info.popular && <div className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 bg-(--clr-accent2) w-xs aspect-square -z-10 rounded-full blur-[200px]"></div>}
		</div>
	);
}
