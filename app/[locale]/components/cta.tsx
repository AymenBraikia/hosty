import { useTranslations } from "next-intl";
import Button from "./button";

export default function Cta() {
	const t = useTranslations("cta");

	return (
		<section className="relative w-dvw h-fit p-30 flex justify-center items-center flex-col text-center gap-8 max-md:px-6">
			<h1 className="text-6xl font-black max-md:text-3xl text-center">{t("title")}</h1>
			<h4 className="text-xl font-bold max-md:text-2xl">{t("subtitle")}</h4>
			<div className="flex justify-center items-center gap-8 max-md:flex-col max-md:w-full">
				<Button
					url="/hosting"
					css="text-xl bg-white text-(--clr-accent) rounded-full hover:shadow-[0_0_10px_0_var(--clr-accent)] hover:bg-(--clr-accent) hover:text-white transition max-md:w-full"
					styles={{ padding: 15 }}
					content={t("buttons.launchServer")}
				/>
				<Button
					url="/docs"
					css="text-xl bg-white text-(--clr-accent2) rounded-full hover:shadow-[0_0_10px_0_var(--clr-accent2)] hover:bg-(--clr-accent2) hover:text-white transition max-md:w-full"
					styles={{ padding: 15 }}
					content={t("buttons.viewDocs")}
				/>
			</div>
			<div className="bg_anim w-dvw h-full absolute -z-10 opacity-50">
				<div className="w-[120dvw] -translate-x-[10dvw] bg-center bg-no-repeat h-full shadow-[inset_0_0_80px_30px_black] bg-[url(/bg_texture.png)]"></div>
			</div>
		</section>
	);
}
