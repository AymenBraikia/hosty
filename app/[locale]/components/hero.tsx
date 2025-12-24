import { useRef } from "react";
import Button from "./button";
import { useRouter } from "next/navigation";
import Search from "./svg/search";
import Arrow from "./svg/arrow";
import Terminal from "./terminal";
import Correct from "./svg/correct";

export default function Hero() {
	const inp = useRef<HTMLInputElement>(null);
	const router = useRouter();

	return (
		<section className="w-full px-16 max-sm:px-4 relative h-dvh flex justify-center items-center gap-8 select-none">
			<div className="h-full flex justify-center items-start flex-col gap-8 max-lg:w-full w-1/2">
				<div className="flex max-md:text-xs font-bold justify-center items-center gap-2.5 text-(--clr-primary) p-2.5 bg-(--clr-surface) rounded-4xl border">
					<div className="pulse w-2 h-2 rounded-full bg-(--clr-primary)"></div>New: NVMe Gen 4 Cloud Servers
				</div>

				<div className="text-6xl font-black max-lg:text-5xl max-md:text-5xl">
					<h1>Host your dreams</h1>
					<h1 className="text_anim">Beyond Limits.</h1>
				</div>
				<p className="text-gray-400 text-xl max-w-full tracking-tight text_shine max-md:text-2xl max-sm:text-xl">Hosty provides premium cloud infrastructure with enterprise-grade security. Deploy instantly, scale globally, sleep soundly.</p>

				<div className="min-w-full max-sm:flex-col border-gray-700 border rounded-2xl flex justify-between gap-4 px-6 py-3 bg-(--clr-background-opacity)">
					<div className="flex justify-center items-center w-full gap-4 text-gray-400">
						<Search s={30} color="currentColor" />
						<input ref={inp} className="outline-0 w-full" type="text" placeholder="Find your perfect domain..." />
					</div>
					<Button
						children_el={<Arrow color="currentColor" s={30} />}
						content="Search"
						css="outline-0 bg_anim text-xl flex justify-center items-center gap-0 hover:gap-2"
						action={() => inp.current?.value && router.push(`/domain/?domain=${inp.current.value}`)}
					/>
				</div>
				<ul className="flex max-sm:text-xs max-sm:flex-wrap gap-7 text-gray-400">
					<li className="flex justify-start items-center gap-1.5">
						<Correct s={18} color="var(--clr-primary)" /> Free SSL
					</li>
					<li className="flex justify-start items-center gap-1.5">
						<Correct s={18} color="var(--clr-primary)" /> DDoS Protection
					</li>
					<li className="flex justify-start items-center gap-1.5">
						<Correct s={18} color="var(--clr-primary)" /> 99.9% Uptime
					</li>
				</ul>
			</div>
			<Terminal />

			<div className="w-[250px] aspect-square bg-(--clr-accent2) absolute bottom-16 -left-[10dvw] rounded-full blur-[200px] -z-50"></div>
			<div className="w-[250px] aspect-square bg-(--clr-accent) absolute top-16 -right-[10dvw] rounded-full blur-[200px] -z-50"></div>
		</section>
	);
}
