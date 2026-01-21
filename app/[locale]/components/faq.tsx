import { getTranslations } from "next-intl/server";
import FaqList from "./FaqList";

export default async function Faq() {
	const t = await getTranslations("faq");

	const questions = t.raw("questions") as { question: string; answer: string }[];

	return (
		<section className="w-dvw h-fit px-30 flex flex-col justify-center items-center gap-16 bg-(--clr-surface2) py-30 max-md:px-6">
			<h2 className="text-3xl font-black max-md:text-center">{t("title")}</h2>

			<div className="w-3/5 max-md:w-full">
				<FaqList questions={questions} />
			</div>
		</section>
	);
}
