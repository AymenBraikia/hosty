"use client";

import Cta from "./components/cta";
import Faq from "./components/faq";
import Hero from "./components/hero";
import Network from "./components/network";
import OneClickDeploy from "./components/oneClickDeploy";
import Perks from "./components/perks";
import Pricing from "./components/pricing";
import TechStackScroll from "./components/svg/slider";
import Trust from "./components/trust";

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
