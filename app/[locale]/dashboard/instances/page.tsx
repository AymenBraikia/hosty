import Board from "../components/board";
import ActionBtns from "./actionBtns";

const instances = [
	{ name: "wa7d", status: true, ip: "15.100.73.203", cpu: "45%" },
	{ name: "zoj", status: false, ip: "178.67.24.38", cpu: "32%" },
	{ name: "thlatha", status: true, ip: "77.18.32.105", cpu: "58%" },
	{ name: "rab3a", status: true, ip: "231.139.121.49", cpu: "13%" },
	{ name: "khamsa", status: true, ip: "102.198.144.213", cpu: "89%" },
];
export default function Home() {
	return (
		<div className="flex flex-col justify-start items-start gap-5 w-full">
			<h3 className="text-2xl font-black">Instances</h3>
			<p className="text_shine">Manage your cloud infrastructure</p>
			<Board
				titles={["Name", "Status", "IP Address", "Load (CPU)", "Actions"]}
				content={instances.map((instance, i) => (
					<div key={instance.ip} className={`flex justify-center items-center w-full min-h-8 bg-(--clr-surface2) p-4 border border-(--clr-surface-light2) hover:bg-(--clr-surface) transition ${i + 1 == instances.length && "rounded-b-2xl"}`}>
						<p className="font-bold text-gray-400 w-full">{instance.name}</p>
						<div className="font-bold text-gray-400 w-full">
							{instance.status ? (
								<div className="flex justify-start items-center gap-2 text-green-400">
									<div className="rounded-full w-2 pulse aspect-square bg-current"></div>
									<div className="text-current">Running</div>
								</div>
							) : (
								<div className="flex justify-start items-center gap-2 text-red-400">
									<div className="rounded-full w-2 pulse aspect-square bg-current"></div>
									<div className="text-current">Stopped</div>
								</div>
							)}
						</div>
						<p className="font-bold text-gray-400 w-full">{instance.ip}</p>
						<p className="font-bold text-gray-400 w-full">{instance.cpu}</p>
						<ActionBtns />
					</div>
				))}
			/>
		</div>
	);
}
