import Thunder from "./svg/thunder";

export default function Terminal() {
	return (
		<div className="terminal flex-col rounded-2xl w-2/4 h-3/5 border-gray-800 border max-lg:hidden lg:flex">
			<div className="w-full flex justify-center items-center bg-(--clr-surface) border-gray-800 border-b relative px-4 py-2 rounded-t-md">
				<div className="flex absolute left-3">
					<div className="w-3 h-3 rounded-full bg-red-500 m-1"></div>
					<div className="w-3 h-3 rounded-full bg-orange-400 m-1"></div>
					<div className="w-3 h-3 rounded-full bg-green-400 m-1"></div>
				</div>
				<p>dev@hosty:~</p>
			</div>
			<div className="p-2.5 flex flex-col gap-5">
				<p className="flex gap-2.5">
					<span className="text-(--clr-accent)">➜</span> <span className="text-(--clr-primary)">dev@hosty:~$</span> npm install hosty-cli |
				</p>
				<p className="text-[14px] text-gray-500">
					<span className="text-(--clr-primary)">[+]</span> hosty-cli@3.0.0 installed
				</p>

				<p className="flex gap-2.5">
					<span className="text-(--clr-accent)">➜</span>{" "}
					<span className="text-(--clr-primary) flex justify-start items-center gap-2.5">
						dev@hosty:~$
						<span className="blinker"></span>
					</span>
				</p>
			</div>
			<div className="absolute bottom-3.5 right-3.5 w-40 h-20 bg-(--clr-surface) float_anim rounded-xl flex justify-center items-center gap-2.5 font-extrabold [font-family:var(--font-main)]">
				<div className="bg-[#029a3941] w-fit max-w-12 max-h-12 aspect-square p-3 rounded-full">
					<Thunder s={20} color="#4ade80" />
				</div>
				<div>
					<p className="text-gray-400 text-xs">SPEED SCORE</p>
					<p>100/100</p>
				</div>
			</div>
		</div>
	);
}
