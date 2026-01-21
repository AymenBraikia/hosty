"use client";

import { useState } from "react";
import DropDown from "./svg/dropdown";

interface FaqItem {
	question: string;
	answer: string;
}

export default function FaqList({ questions }: { questions: FaqItem[] }) {
	const [selected_q, set_question] = useState<number | null>(null);

	return (
		<div className="flex flex-col justify-center items-center gap-3 w-full">
			{questions.map((q, id) => (
				<div key={id} className="transition flex flex-col w-full bg-(--clr-surface) border-2 border-(--clr-surface-light2) overflow-hidden rounded-2xl cursor-pointer text-foreground">
					<h3 onClick={() => (selected_q === id ? set_question(null) : set_question(id))} className="transition flex justify-between items-center font-bold text-current hover:bg-(--clr-surface-light) p-5">
						{q.question}
						<DropDown s={25} css={`transition ${selected_q !== id ? "" : "rotate-180"}`} color="currentColor" />
					</h3>

					<p className={`transition text-gray-400 px-5 overflow-hidden ${selected_q !== id ? "max-h-0 pb-0" : "pb-5 max-h-40"}`}>{q.answer}</p>
				</div>
			))}
		</div>
	);
}
