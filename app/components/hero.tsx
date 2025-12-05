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
		<div className="w-4/5 relative left-[10%] h-dvh flex justify-center items-start flex-col flex-wrap gap-8 select-none ">
			<div className="flex justify-center items-center gap-2.5 text-(--clr-primary) p-2.5 font-light bg-(--clr-surface) rounded-4xl border">
				<div className="pulse w-2 h-2 rounded-full bg-(--clr-primary)"></div>New: NVMe Gen 4 Cloud Servers
			</div>

			<div className="text-7xl font-black">
				<p>Host your dreams</p>
				<p className="text_anim">Beyond Limits.</p>
			</div>
			<p className="text-gray-400 text-xl max-w-2/5 tracking-tight text_shine">Hosty provides premium cloud infrastructure with enterprise-grade security. Deploy instantly, scale globally, sleep soundly.</p>

			<div className="min-w-2/5 border-gray-700 border rounded-2xl flex justify-between gap-4 px-6 py-3 bg-(--clr-background-opacity)">
				<div className="flex justify-center items-center w-full gap-4 text-gray-400">
					<Search s={30} color="currentColor" />
					<input ref={inp} className="outline-0 w-full" type="text" placeholder="Find your perfect domain..." />
				</div>
				<Button
					children_el={<Arrow color="currentColor" s={30} />}
					content="Search"
					css="outline-0 bg_anim text-xl flex justify-center items-center gap-0 hover:gap-2"
					action={() => inp.current?.value && router.push(`/search/?domain=${inp.current.value}`)}
				/>
			</div>
			<ul className="flex gap-7 text-gray-400">
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

			<Terminal />

			<div className="w-[250px] aspect-square bg-(--clr-accent2) absolute bottom-16 -left-[10dvw] rounded-full blur-[200px] -z-50"></div>
			<div className="w-[250px] aspect-square bg-(--clr-accent) absolute top-16 -right-[10dvw] rounded-full blur-[200px] -z-50"></div>
		</div>
	);
}
