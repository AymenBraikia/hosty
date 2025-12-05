import { useRef } from "react";
import Button from "./button";
import { useRouter } from "next/navigation";
import Search from "./svg/search";
import Arrow from "./svg/arrow";

export default function Hero() {
	const inp = useRef<HTMLInputElement>(null);
	const router = useRouter();

	return (
		<div className="w-4/5 relative left-[10%] h-dvh flex justify-center items-start flex-col flex-wrap gap-8">
			<div className="flex justify-center items-center gap-2.5 text-(--clr-primary) p-2.5 font-light bg-(--clr-surface) rounded-4xl border">
				<div className="pulse w-2 h-2 rounded-full bg-(--clr-primary)"></div>New: NVMe Gen 4 Cloud Servers
			</div>

			<div className="text-7xl font-black">
				<p>Host your dreams</p>
				<p className="[background-image:var(--gradient)] bg-clip-text text-transparent">Beyond Limits.</p>
			</div>
			<p className="text-gray-400 text-xl max-w-2/5">Hosty provides premium cloud infrastructure with enterprise-grade security. Deploy instantly, scale globally, sleep soundly.</p>

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
		</div>
	);
}
