"use client";
// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import Button from "./button";
// import Select from "./select";
import Hero from "./hero";
import OneClickDeploy from "./oneClickDeploy";
import Perks from "./perks";
import TechStackScroll from "./svg/slider";

export default function Body() {
	return (
		<div className="translate-y-16 flex flex-col justify-center items-start gap-14">
			<Hero />
			<TechStackScroll />
			<Perks />
			<OneClickDeploy />
		</div>
	);
}
