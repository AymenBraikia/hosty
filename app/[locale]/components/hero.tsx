import Terminal from "./terminal";
import Correct from "./svg/correct";
import { getTranslations } from "next-intl/server";

export default async function Hero() {
	const t = await getTranslations("hero");

	return (
		<section className="w-full px-16 max-sm:px-4 relative h-dvh flex justify-center items-center gap-8 select-none">
			<div className="h-full flex justify-center items-start flex-col gap-8 max-lg:w-full w-1/2">
				<div className="flex max-md:text-xs font-bold justify-center items-center gap-2.5 text-(--clr-primary) p-2.5 bg-(--clr-surface) rounded-4xl border">
					<div className="pulse w-2 h-2 rounded-full bg-(--clr-primary)"></div>
					{t("badge")}
				</div>

				<div className="text-6xl font-black max-lg:text-5xl max-md:text-5xl">
					<h1>{t("headline")}</h1>
					<h1 className="text_anim">{t("subheadline")}</h1>
				</div>
				<p className="text-gray-400 text-xl max-w-full tracking-tight text_shine max-md:text-2xl max-sm:text-xl">{t("description")}</p>

				<ul className="flex max-sm:text-xs max-sm:flex-wrap gap-7 text-gray-400">
					<li className="flex justify-start items-center gap-1.5">
						<Correct s={18} color="var(--clr-primary)" /> {t("features.ssl")}
					</li>
					<li className="flex justify-start items-center gap-1.5">
						<Correct s={18} color="var(--clr-primary)" /> {t("features.ddos")}
					</li>
					<li className="flex justify-start items-center gap-1.5">
						<Correct s={18} color="var(--clr-primary)" /> {t("features.uptime")}
					</li>
				</ul>
			</div>
			<Terminal />

			<div className="w-[250px] aspect-square bg-(--clr-accent2) absolute bottom-16 -left-[10dvw] rounded-full blur-[200px] -z-50"></div>
			<div className="w-[250px] aspect-square bg-(--clr-accent) absolute top-16 -right-[10dvw] rounded-full blur-[200px] -z-50"></div>
		</section>
	);
}
