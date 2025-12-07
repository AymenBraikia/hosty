import { useEffect, useRef } from "react";
import Shield from "./svg/shield";
import Thunder from "./svg/thunder";
import Web from "./svg/web";
import { DarkWorldMap } from "@/lib/world_map";
// import WorldMap from "./svg/worldMap";
export default function Network() {
	const hasInitialized = useRef(false);
	useEffect(() => {
		if (!hasInitialized.current) {
			new DarkWorldMap("worldMap");
			hasInitialized.current = true;
			console.log("Map data loaded and drawing started");
		}
	}, []);
	return (
		<div className="w-dvw h-dvh bg-(--clr-surface) flex justify-center items-center px-16 gap-16">
			<div className="flex flex-col justify-center items-start gap-4 w-1/2">
				<div className="flex justify-center items-center gap-2.5 text-xs text-(--clr-primary) p-1.5 font-black bg-(--clr-surface) rounded-4xl border-2">
					<Web color="var(--clr-primary)" s={20} />
					GLOBAL NETWORK
				</div>
				<h1 className="text-5xl font-black w-full">
					Data centers located <br /> <span className="text_anim">where your users are.</span>
				</h1>
				<p className="text_shine w-full text-xl">Our ultra-low latency network spans 6 continents. Hosty automatically routes traffic to the nearest node, ensuring your site loads instantly from Tokyo to Toronto.</p>

				<div className="w-full flex justify-start items-center p-4 gap-4 bg-(--clr-surface-light2) border border-(--clr-surface-light) rounded-2xl">
					<Thunder color="yellow" s={30} />
					<div className="flex flex-col">
						<h3 className="font-bold text-xl">Latency Optmization</h3>
						<p className="text-gray-500">Smart routing cuts response times by 40%</p>
					</div>
				</div>

				<div className="w-full flex justify-start items-center p-4 gap-4 bg-(--clr-surface-light2) border border-(--clr-surface-light) rounded-2xl">
					<Shield color="lime" s={30} />
					<div className="flex flex-col">
						<h3 className="font-bold text-xl">DDos Mitigation</h3>
						<p className="text-gray-500">Always-on protection up to 100Gbps</p>
					</div>
				</div>
			</div>
			<div className="w-1/2 h-2/3 bg-(--clr-surface2) flex justify-center items-center rounded-2xl border-2 border-(--clr-surface-light2) relative">
				<canvas className="w-full h-full rounded-2xl" id="worldMap"></canvas>
			</div>
		</div>
	);
}
