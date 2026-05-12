import Button from "../components/button";
import Star2 from "../components/svg/star2";
import Cpu from "../components/svg/cpu";

interface service {
	type: "Cloud VPS" | "Cloud VDS" | "Dedicated Server";
	cpu: number;
	ram: number;
	bandwidth: string;
	storage: string;
	id: number;
	title?: string;
	price: number;
	discount?: number;
	mostPopular?: boolean;
}

export default function Services({ filter, services }: { filter: string; services: service[] }) {
	return (
		<div className="flex justify-center items-center w-full gap-8 flex-wrap my-10">
			{services.map((s, i) => (
				<div
					key={i}
					className={`w-96 min-h-96 bg-(--clr-surface) group ${!s.mostPopular && "border border-(--clr-surface-light2)"} rounded-2xl ${
						filter == "All" || filter == s.type ? "flex" : "hidden"
					} justify-center items-start flex-col p-4 relative overflow-hidden hover:border-(--clr-primary) hover:-translate-y-2.5 transition ${s.mostPopular ? "scale-100 border-gradient py-12 gap-4" : "gap-4"}`}
				>
					<h2 className="text-2xl font-black flex w-full justify-between items-center">
						{s.type}
						<div
							className={`text-gray-400 bg-gray-400/10 p-2.5 rounded-full aspect-square transition ${
								s.mostPopular ? "group-hover:text-(--clr-accent2) group-hover:bg-(--clr-accent2-opacity)" : "group-hover:text-(--clr-primary) group-hover:bg-(--clr-primary-opacity)"
							}`}
						>
							<Cpu s={25} color="currentColor" />
						</div>
					</h2>
					<h3 className="text-3xl font-black">
						${s.price}
						<span className="text-base text-gray-400 font-light">/mo</span>
					</h3>
					<div className={`flex flex-col w-full gap-2 text-gray-500 transition ${s.mostPopular ? "group-hover:text-(--clr-accent2)" : "group-hover:text-(--clr-primary)"}`}>
						<div className="flex justify-between items-center font-bold">
							CPU <span className="text-foreground font-normal">{s.cpu} vCPU</span>
						</div>
						<hr className="border-(--clr-surface-light2)" />
						<div className="flex justify-between items-center font-bold">
							RAM <span className="text-foreground font-normal">{s.ram} GB</span>
						</div>
						<hr className="border-(--clr-surface-light2)" />
						<div className="flex justify-between items-center font-bold">
							Storage <span className="text-foreground font-normal">{s.storage}</span>
						</div>
						<hr className="border-(--clr-surface-light2)" />
						<div className="flex justify-between items-center font-bold">
							Bandwidth <span className="text-foreground font-normal">{s.bandwidth}</span>
						</div>
						<hr className="border-(--clr-surface-light2)" />
					</div>
					<Button url={`/plan?id=${s.id}`} content="Deploy Now" css={`w-full text-center rounded-full cursor-pointer transition ${s.mostPopular ? "bg_anim shadow_anim" : "deploy"}`} />
					{s.mostPopular && (
						<>
							<span className="absolute left-1/2 top-5 -translate-1/2 bg_anim px-4 py-1 rounded-full font-black text-xs min-w-fit flex justify-center items-center gap-1 max-sm:text-[10px]">
								<Star2 s={16} color="white" />
								MOST POPULAR
							</span>
							<div className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 w-60 bg_anim aspect-square -z-10 rounded-full blur-[150px]"></div>
						</>
					)}
				</div>
			))}
		</div>
	);
}
