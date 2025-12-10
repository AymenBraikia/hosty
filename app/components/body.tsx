"use client";

import Hero from "./hero";
import Network from "./network";
import OneClickDeploy from "./oneClickDeploy";
import Perks from "./perks";
import Pricing from "./pricing";
import TechStackScroll from "./svg/slider";
import Trust from "./trust";

export default function Body() {
	return (
		<div className="translate-y-16 flex flex-col justify-center items-start gap-14">
			<Hero />
			<TechStackScroll />
			<Perks />
			<OneClickDeploy />
			<Network />
			<Pricing />
			<Trust />
		</div>
	);
}
