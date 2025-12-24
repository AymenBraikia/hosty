// import { useRef } from "react";
// import Button from "./button";
// import { useRouter } from "next/navigation";
// import Search from "./svg/search";
// import Arrow from "./svg/arrow";
// import Terminal from "./terminal";
// import Correct from "./svg/correct";

export default function Hero() {
	return (
		<section className="w-full px-16 max-sm:px-4 relative h-dvh flex justify-center items-center gap-8 select-none">
			<div className="h-full flex justify-center items-start flex-col gap-8 max-lg:w-full w-1/2">
				<div className="p-2.5 rounded-4xl text-transparent loading w-80 h-10"></div>

				<div className="w-full flex flex-col justify-center items-center gap-4 pr-60">
					<div className="w-full h-15 text-6xl font-black max-lg:text-5xl max-md:text-5xl text-transparent loading"></div>
					<div className="w-full h-15 text-6xl font-black max-lg:text-5xl max-md:text-5xl text-transparent loading"></div>
				</div>
				<p className="text-xl max-w-full tracking-tight max-md:text-2xl max-sm:text-xl text-transparent loading">Hosty provides premium cloud infrastructure with enterprise-grade security. Deploy instantly, scale globally, sleep soundly.</p>

				<div className="min-w-full h-20 max-sm:flex-colrounded-2xl flex justify-between gap-4 px-6 py-3 bg-(--clr-background-opacity) text-transparent loading"></div>
				{/* <ul className="flex max-sm:text-xs max-sm:flex-wrap gap-7 text-gray-400">
					<li className="flex justify-start items-center gap-1.5">
						<Correct s={18} color="var(--clr-primary)" /> Free SSL
					</li>
					<li className="flex justify-start items-center gap-1.5">
						<Correct s={18} color="var(--clr-primary)" /> DDoS Protection
					</li>
					<li className="flex justify-start items-center gap-1.5">
						<Correct s={18} color="var(--clr-primary)" /> 99.9% Uptime
					</li>
				</ul> */}
			</div>
			{/* <Terminal /> */}
			<div className="w-1/2 h-3/5 loading"></div>
		</section>
	);
}
