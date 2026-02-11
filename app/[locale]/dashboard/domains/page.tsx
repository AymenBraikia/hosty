import Check_box from "../../components/cbox";
import Board from "../components/board";
import Manage_btns from "./manage";

const domains = [
	{ name: "Aymen1.xyz", status: true, reg: "2/11/2026", exp: "2/11/2026", renew: true },
	{ name: "Aymen2.xyz", status: false, reg: "2/11/2026", exp: "2/11/2026", renew: false },
	{ name: "Aymen3.xyz", status: true, reg: "2/11/2026", exp: "2/11/2026", renew: true },
	{ name: "Aymen4.xyz", status: true, reg: "2/11/2026", exp: "2/11/2026", renew: true },
	{ name: "Aymen5.xyz", status: true, reg: "2/11/2026", exp: "2/11/2026", renew: false },
];
export default function Home() {
	return (
		<div className="flex flex-col justify-start items-start gap-5 w-full">
			<h3 className="text-2xl font-black">Domains</h3>
			<p className="text_shine">Manage your cloud infrastructure</p>
			<Board
				titles={["Domain", "Status", "Registered", "Expires", "Auto", "Manage"]}
				content={domains.map((domain, i) => (
					<div key={domain.name} className={`flex justify-center items-center w-full min-h-8 bg-(--clr-surface2) p-4 border border-(--clr-surface-light2) hover:bg-(--clr-surface) transition ${i + 1 == domains.length && "rounded-b-2xl"}`}>
						<p className="font-bold text-gray-400 w-full">{domain.name}</p>
						<div className="font-bold text-gray-400 w-full">{domain.status ? <p className="flex justify-start items-center text-green-400">Active</p> : <p className="flex justify-start items-center text-red-400">Expired</p>}</div>
						<p className="font-bold text-gray-400 w-full">{domain.reg}</p>
						<p className="font-bold text-gray-400 w-full">{domain.exp}</p>
						<div className="w-full">
							<Check_box display_status state={domain.status} />
						</div>
						<Manage_btns />
					</div>
				))}
			/>
		</div>
	);
}
