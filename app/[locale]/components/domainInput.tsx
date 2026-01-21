"use client";
import { useRef } from "react";
import Button from "./button";
import Arrow from "./svg/arrow";
import Search from "./svg/search";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function DomainInput() {
	const inp = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const t = useTranslations("hero");

	return (
		<div className="min-w-full max-sm:flex-col border-gray-700 border rounded-2xl flex justify-between gap-4 px-6 py-3 bg-(--clr-background-opacity)">
			<div className="flex justify-center items-center w-full gap-4 text-gray-400">
				<Search s={30} color="currentColor" />
				<input ref={inp} className="outline-0 w-full" type="text" placeholder={t("search.placeholder")} />
			</div>
			<Button
				children_el={<Arrow color="currentColor" s={30} />}
				content={t("search.button")}
				css="outline-0 bg_anim text-xl flex justify-center items-center gap-0 hover:gap-2"
				action={() => inp.current?.value && router.push(`/domain/?domain=${inp.current.value}`)}
			/>
		</div>
	);
}
