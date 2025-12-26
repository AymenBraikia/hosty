import { useState } from "react";
import DropDown from "./svg/dropdown";
import { useTranslations } from "next-intl";

export default function Faq() {
	const [selected_q, set_question] = useState<number | null>(null);
	const t = useTranslations("faq");

	const questions: { question: string; answer: string }[] = t.raw("questions");
	return (
		<section className="w-dvw h-fit px-30 flex flex-col justify-center items-center gap-16 bg-(--clr-surface2) py-30 max-md:px-6">
			<h2 className="text-3xl font-black max-md:text-center">{t("title")}</h2>
			<div className="flex flex-col justify-center items-center gap-3 w-3/5 max-md:w-full">
				{questions.map((q, id) => (
					<div className={`transition flex flex-col w-full bg-(--clr-surface) border-2 border-(--clr-surface-light2) overflow-hidden rounded-2xl cursor-pointer text-foreground`} key={id}>
						<h3 onClick={() => (selected_q == id ? set_question(null) : set_question(id))} className="transition flex justify-between items-center font-bold text-current hover:bg-(--clr-surface-light) p-5">
							{q.question}
							{
								<DropDown
									s={25}
									css={`transition 
										${selected_q != id ? "" : "rotate-180"}
									`}
									color="currentColor"
								/>
							}
						</h3>

						<p className={`transition text-gray-400 px-5 overflow-hidden ${selected_q != id ? "max-h-0 pb-0" : "pb-5 max-h-40"}`}>{q.answer}</p>
					</div>
				))}
			</div>
		</section>
	);
}
