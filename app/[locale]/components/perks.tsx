import { useTranslations } from "next-intl";
import Code from "./svg/code";
import Headphones from "./svg/headphones";
import Scale from "./svg/scale";
import Shield from "./svg/shield";
import Thunder from "./svg/thunder";
import Web from "./svg/web";

export default function Perks() {
	const t = useTranslations("why");
	const perks = [
		{ title: t("features.nvme.title"), description: t("features.nvme.description"), icon: <Thunder s={30} color="var(--clr-primary)" /> },
		{ title: t("features.security.title"), description: t("features.security.description"), icon: <Shield s={30} color="var(--clr-primary)" /> },
		{ title: t("features.cdn.title"), description: t("features.cdn.description"), icon: <Web s={30} color="var(--clr-primary)" /> },
		{ title: t("features.devtools.title"), description: t("features.devtools.description"), icon: <Code s={30} color="var(--clr-primary)" /> },
		{ title: t("features.support.title"), description: t("features.support.description"), icon: <Headphones s={30} color="var(--clr-primary)" /> },
		{ title: t("features.scalability.title"), description: t("features.scalability.description"), icon: <Scale s={30} color="var(--clr-primary)" /> },
	];
	
	return (
		<section className="h-fit min-h-dvh text-center py-30 max-md:py-15 flex flex-col justify-center items-center gap-12 bg-(--clr-surface-light2) px-6">
			<h1 className="font-black text-5xl max-md:text-4xl">
				{t("headline")}
				<span className="text_anim"> Hosty</span>
			</h1>
			<p className="text-gray-400 text-xl text_shine">{t("description")}</p>
			<div className="flex flex-wrap justify-center items-center gap-4">
				{perks.map((perk, i) => {
					return (
						<div
							key={i}
							className="w-[30%] text-start min-w-80 max-md:min-w-11/12 min-h-64 flex flex-col justify-center items-start bg-(--clr-surface) p-8 gap-6 rounded-2xl border border-(--clr-surface-light) transition hover:bg-(--clr-surface-light) group"
						>
							<div className="w-14 h-14 bg-(--clr-surface-light2) border border-gray-700 rounded-full group-hover:scale-110 flex justify-center items-center">{perk.icon}</div>
							<h2 className="text-xl font-bold text-foreground">{perk.title}</h2>
							<p className="text-gray-400">{perk.description}</p>
						</div>
					);
				})}
			</div>
		</section>
	);
}
