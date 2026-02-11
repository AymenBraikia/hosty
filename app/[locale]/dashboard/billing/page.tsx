import Board from "../components/board";

const transactions = [
	{
		date: "1/1/2026",
		description: "VPS",
		price: 15.99,
		paid: false,
	},
	{
		date: "1/1/2026",
		description: "Domain",
		price: 15.99,
		paid: true,
	},
	{
		date: "1/1/2026",
		description: "VDS",
		price: 15.99,
		paid: true,
	},
	{
		date: "1/1/2026",
		description: "Dedicated Server",
		price: 15.99,
		paid: false,
	},
	{
		date: "1/1/2026",
		description: "Domain renewal",
		price: 15.99,
		paid: true,
	},
	{
		date: "1/1/2026",
		description: "VPS",
		price: 15.99,
		paid: false,
	},
	{
		date: "1/1/2026",
		description: "VPS",
		price: 15.99,
		paid: true,
	},
	{
		date: "1/1/2026",
		description: "VPS",
		price: 15.99,
		paid: false,
	},
	{
		date: "1/1/2026",
		description: "VPS",
		price: 15.99,
		paid: true,
	},
];
export default function Home() {
	return (
		<div className="flex flex-col justify-start items-start gap-5 w-full">
			<h3 className="text-2xl font-black">Billing</h3>
			<Board
				titles={["Date", "Description", "Paid", "Amount"]}
				content={transactions.map((t, i) => (
					<div key={t.description + i} className={`flex justify-center items-center w-full min-h-8 bg-(--clr-surface2) p-4 border border-(--clr-surface-light2) hover:bg-(--clr-surface) transition ${i + 1 == transactions.length && "rounded-b-2xl"}`}>
						<p className="font-bold text-gray-400 w-full">{t.date}</p>
						<p className="font-bold text-gray-400 w-full">{t.description}</p>
						<div className={`font-bold text-xs  w-full ${t.paid ? "text-green-400" : "text-red-400"}`}>{t.paid ? <p className={"border border-current w-fit px-3 py-1 rounded-xl bg-green-400/10"}>PAID</p> : <p className={"border border-current w-fit px-3 py-1 rounded-xl bg-red-400/10"}>NOT PAID</p>}</div>
						<p className="font-bold text-gray-400 w-full">{t.price}</p>
					</div>
				))}
			/>
		</div>
	);
}
