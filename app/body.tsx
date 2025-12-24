"use client";

import LoadingHero from "./components/loading/hero";
import LoadingTechStackScroll from "./components/loading/slider";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("./components/hero"), { ssr: false, loading: () => <LoadingHero /> });
const TechStackScroll = dynamic(() => import("./components/loading/slider"), { ssr: false, loading: () => <LoadingTechStackScroll /> });

const Cta = dynamic(() => import("./components/cta"), { ssr: false, loading: () => <></> });
const Faq = dynamic(() => import("./components/faq"), { ssr: false, loading: () => <></> });
const Network = dynamic(() => import("./components/network"), { ssr: false, loading: () => <></> });
const OneClickDeploy = dynamic(() => import("./components/oneClickDeploy"), { ssr: false, loading: () => <></> });
const Perks = dynamic(() => import("./components/perks"), { ssr: false, loading: () => <></> });
const Pricing = dynamic(() => import("./components/pricing"), { ssr: false, loading: () => <></> });
const Trust = dynamic(() => import("./components/trust"), { ssr: false, loading: () => <></> });

export default function Body() {
	return (
		<div className="translate-y-16 flex flex-col justify-center items-start">
			<Hero />
			<TechStackScroll />
			<Perks />
			<OneClickDeploy />
			<Network />
			<Pricing />
			<Trust />
			<Faq />
			<Cta />
		</div>
	);
}
