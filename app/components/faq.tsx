import { useState } from "react";
import DropDown from "./svg/dropdown";
let id = 0;
const questions: { question: string; answer: string; id: number }[] = [
	{
		id: id++,
		question: "How fast is Hosty compared to competitors?",
		answer: "Hosty uses enterprise-grade NVMe NVMe Gen4 storage and 10Gbps uplink ports, making us approximately 4x faster than standard SSD hosting providers like Godaddy or Bluehost.",
	},
	{
		id: id++,
		question: "What types of hosting do you offer?",
		answer: "We offer shared web hosting, VPS servers, dedicated servers, cloud hosting, and WordPress hosting. All plans include free SSL certificates, daily backups, and 24/7 support to ensure your website runs smoothly.",
	},
	{
		id: id++,
		question: "Do you offer a money-back guarantee?",
		answer: "Yes, we offer a 30-day money-back guarantee on all hosting plans. If you're not satisfied with our service, simply contact our support team within 30 days for a full refund, no questions asked.",
	},
	{
		id: id++,
		question: "Do you provide a control panel?",
		answer: "Yes, all hosting plans include our intuitive control panel that makes it easy to manage domains, databases, email accounts, files, and more without any technical knowledge required.",
	},
	{ id: id++, question: "Do you offer free migration?", answer: "Yes! Our expert support team will migrate your existing websites from any other provider completely free of charge with zero downtime." },
	{
		id: id++,
		question: "Is my data backed up automatically?",
		answer: "Yes! We perform daily automated backups of all hosting accounts. Professional and Enterprise plans include 30-day backup retention with one-click restore functionality from your control panel.",
	},
	{ id: id++, question: "Where are your data centers located?", answer: "We have data centers in New York, London, Frankfurt, Singapore, and Sydney. You can choose your preferred location during checkout." },
];

export default function Faq() {
	const [selected_q, set_question] = useState<number | null>(null);
	return (
		<section className="w-dvw h-fit px-30 flex flex-col justify-center items-center gap-16 bg-(--clr-surface2) py-30">
			<h2 className="text-3xl font-black">Frequently Asked Questions</h2>
			<div className="flex flex-col justify-center items-center gap-3 w-3/5">
				{questions.map((q) => (
					<div className={`transition flex flex-col w-full bg-(--clr-surface) border-2 border-(--clr-surface-light2) overflow-hidden rounded-2xl cursor-pointer text-foreground`} key={q.id}>
						<h3 onClick={() => (selected_q == q.id ? set_question(null) : set_question(q.id))} className="transition flex justify-between items-center font-bold text-current hover:bg-(--clr-surface-light) p-5">
							{q.question}
							{
								<DropDown
									s={25}
									css={`transition 
										${selected_q != q.id ? "" : "rotate-180"}
									`}
									color="currentColor"
								/>
							}
						</h3>

						<p className={`transition text-gray-400 px-5 overflow-hidden ${selected_q != q.id ? "max-h-0 pb-0" : "pb-5 max-h-40"}`}>{q.answer}</p>
					</div>
				))}
			</div>
		</section>
	);
}
