"use client";
import { useSearchParams } from "next/navigation";
import Search from "../components/svg/search";
import Button from "../components/button";
import Arrow from "../components/svg/arrow";
import { useEffect, useRef, useState } from "react";
import AtcBtn from "../components/addToCart";

type DomainStructure = {
	ext: string;
	name: string;
	renew: number;
	firstYear: number;
	available: boolean;
};

export default function Body() {
	const [domainsList, setDomains] = useState<DomainStructure[]>([]);
	const inp = useRef<HTMLInputElement>(null);
	const searchParams = useSearchParams();
	const [domain, setDomain] = useState<string | null>(searchParams.get("domain"));

	useEffect(() => {
		if (domain)
			(async () => {
				setDomains(await (await fetch("/api/domain_check?domain=" + domain)).json());
			})();
	}, []);
	return (
		<section className={`flex flex-col justify-center items-center min-h-dvh gap-8 ${domain ? "pt-32" : ""}`}>
			<h1 className="text-6xl font-bold text_anim select-none">Find your digital identity</h1>

			<form
				onSubmit={async (e) => {
					setDomains([]);
					e.preventDefault();
					if (!inp.current) return;
					const domain = inp.current.value.replaceAll(" ", "").toLowerCase();
					setDomain(domain);
					const data = await (await fetch("/api/domain_check?domain=" + domain)).json();
					setDomains(data);
				}}
				className="min-w-96 w-1/2 max-w-[700px] max-sm:flex-col bg-(--clr-surface) border-(--clr-surface-light2) border-2 rounded-2xl flex justify-between gap-4 px-6 py-3 group"
			>
				<div className="flex justify-center items-center w-full gap-4 text-gray-500 font-medium text-xl transition group-focus-within:text-foreground">
					<Search s={30} color="currentColor" />
					<input ref={inp} className="outline-0 w-full bg-transparent" type="text" placeholder="Find your perfect domain..." />
				</div>

				<Button type="submit" children_el={<Arrow color="currentColor" s={30} />} content="Search" css="outline-0 bg_anim text-xl flex justify-center items-center gap-0 hover:gap-2" action={() => {}} />
			</form>
			{domain && (
				<section className="flex flex-col justify-center items-center w-full px-40 gap-2">
					{domainsList.length ? (
						domainsList.map((d, i) => (
							<div key={i} className="flex justify-between items-center w-full transition bg-transparent hover:bg-(--clr-surface) px-8 py-4 cursor-pointer rounded-2xl">
								<div className="flex justify-start items-center gap-4">
									<h3 className={`font-bold text-3xl ${!d.available && "line-through text-gray-400"}`}>
										{domain}
										<span className={`${!d.available ? "text-gray-400" : "text-(--clr-primary)"}`}>{d.ext}</span>
									</h3>
									{!d.available && <span className="p-2 px-4 bg-(--clr-surface) rounded-2xl font-bold text-base">Taken</span>}
								</div>
								<div className="flex justify-center items-center gap-8">
									{d.firstYear ? (
										<div className="flex justify-center items-end gap-4">
											<span className="font-bold text-3xl text_anim flex justify-center items-end flex-col">
												${d.firstYear}/yr <p className="text-base text-gray-500 font-normal">Renews at ${d.renew}/yr</p>
											</span>
										</div>
									) : (
										<span className="font-bold text-3xl">${d.renew}/yr</span>
									)}

									<AtcBtn css={{ width: "fit-content" }} />
								</div>
							</div>
						))
					) : (
						<>
							<div className="loading2 bg-(--clr-surface) flex justify-between items-center w-full transition px-8 py-4 cursor-pointer rounded-2xl">
								<div className="flex justify-start items-center gap-4">
									<div className={`w-32 h-12 loading`}></div>
								</div>
								<div className={`w-32 h-12 loading`}></div>
								<div className="flex justify-center items-center gap-8">
									<div className={`w-32 h-12 loading`}></div>
									<div className={`w-32 h-12 loading`}></div>
								</div>
							</div>
							<div className="loading2 bg-(--clr-surface) flex justify-between items-center w-full transition px-8 py-4 cursor-pointer rounded-2xl">
								<div className="flex justify-start items-center gap-4">
									<div className={`w-32 h-12 loading`}></div>
								</div>
								<div className={`w-32 h-12 loading`}></div>
								<div className="flex justify-center items-center gap-8">
									<div className={`w-32 h-12 loading`}></div>
									<div className={`w-32 h-12 loading`}></div>
								</div>
							</div>
							<div className="loading2 bg-(--clr-surface) flex justify-between items-center w-full transition px-8 py-4 cursor-pointer rounded-2xl">
								<div className="flex justify-start items-center gap-4">
									<div className={`w-32 h-12 loading`}></div>
								</div>
								<div className={`w-32 h-12 loading`}></div>
								<div className="flex justify-center items-center gap-8">
									<div className={`w-32 h-12 loading`}></div>
									<div className={`w-32 h-12 loading`}></div>
								</div>
							</div>
							<div className="loading2 bg-(--clr-surface) flex justify-between items-center w-full transition px-8 py-4 cursor-pointer rounded-2xl">
								<div className="flex justify-start items-center gap-4">
									<div className={`w-32 h-12 loading`}></div>
								</div>
								<div className={`w-32 h-12 loading`}></div>
								<div className="flex justify-center items-center gap-8">
									<div className={`w-32 h-12 loading`}></div>
									<div className={`w-32 h-12 loading`}></div>
								</div>
							</div>
							<div className="loading2 bg-(--clr-surface) flex justify-between items-center w-full transition px-8 py-4 cursor-pointer rounded-2xl">
								<div className="flex justify-start items-center gap-4">
									<div className={`w-32 h-12 loading`}></div>
								</div>
								<div className={`w-32 h-12 loading`}></div>
								<div className="flex justify-center items-center gap-8">
									<div className={`w-32 h-12 loading`}></div>
									<div className={`w-32 h-12 loading`}></div>
								</div>
							</div>
							<div className="loading2 bg-(--clr-surface) flex justify-between items-center w-full transition px-8 py-4 cursor-pointer rounded-2xl">
								<div className="flex justify-start items-center gap-4">
									<div className={`w-32 h-12 loading`}></div>
								</div>
								<div className={`w-32 h-12 loading`}></div>
								<div className="flex justify-center items-center gap-8">
									<div className={`w-32 h-12 loading`}></div>
									<div className={`w-32 h-12 loading`}></div>
								</div>
							</div>
						</>
					)}
				</section>
			)}
		</section>
	);
}
