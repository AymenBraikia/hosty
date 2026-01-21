import LoadingHero from "./components/loading/hero";
import LoadingTechStackScroll from "./components/loading/slider";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("./components/hero"), { ssr: true, loading: () => <LoadingHero /> });
const TechStackScroll = dynamic(() => import("./components/slider"), { ssr: true, loading: () => <LoadingTechStackScroll /> });

const Cta = dynamic(() => import("./components/cta"), { ssr: true, loading: () => <></> });
const Faq = dynamic(() => import("./components/faq"), { ssr: true, loading: () => <></> });
const Network = dynamic(() => import("./components/network"), { ssr: true, loading: () => <></> });
const OneClickDeploy = dynamic(() => import("./components/oneClickDeploy"), { ssr: true, loading: () => <></> });
const Perks = dynamic(() => import("./components/perks"), { ssr: true, loading: () => <></> });
const Pricing = dynamic(() => import("./components/pricing"), { ssr: true, loading: () => <></> });
const Trust = dynamic(() => import("./components/trust"), { ssr: true, loading: () => <></> });

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
