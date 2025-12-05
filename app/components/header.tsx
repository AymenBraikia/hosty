"use client";
import { useState } from "react";
import Image from "next/image";
import logoIcon from "../../public/logo.png";
import Link from "next/link";
import Button from "./button";
import Select from "./select";
import Promotion from "./promotion";

type langs = "en-us" | "en-uk" | "ar-dz" | "es-es" | "ru-ru";
export default function Header(props: { promotion?: { url?: string; content: string; expire_date: number } }) {
	const [lang, set_lang] = useState<langs | string>(() => (typeof window !== "undefined" && (localStorage.getItem("lang") as langs)) || "en-us");

	return (
		<header className="w-dvw h-fit p-2.5 bg-(--clr-surface) fixed left-0 top-0 flex justify-between items-center px-20 z-50">
			<div className="flex justify-center items-center gap-10">
				<Link className="flex justify-center items-center text-(--clr-primary) font-bold text-3xl" href={"/"}>
					<Image width={70} height={70} src={logoIcon} alt="logo" />
					Hosty
				</Link>

				<div className="flex justify-center items-center gap-6">
					<Link className="text-[18px] underline_anim text-gray-400 hover:text-gray-200 transition" href={"#"}>
						Hosting
					</Link>
					<Link className="text-[18px] underline_anim text-gray-400 hover:text-gray-200 transition" href={"#"}>
						VPS
					</Link>
					<Link className="text-[18px] underline_anim text-gray-400 hover:text-gray-200 transition" href={"#"}>
						Dedicated
					</Link>
					<Link className="text-[18px] underline_anim text-gray-400 hover:text-gray-200 transition" href={"#"}>
						Domains
					</Link>
				</div>
			</div>
			<div className="flex justify-center items-center gap-5">
				<Select
					options={[
						["English", "en-us"],
						["English", "en-uk"],
						["Arabic", "ar-dz"],
						["Spanish", "es-es"],
						["Russian", "ru-ru"],
					]}
					action={(e) => {
						const val = e.currentTarget.getAttribute("data-val");
						if (!val) return;
						localStorage.setItem("lang", val);
						set_lang(val);
					}}
					default={lang}
				/>
				<Button css="hover:bg-(--clr-accent) hover:shadow-[0_0_10px_0_var(--clr-accent)]" action={() => console.log("clicked my account")} content="Log in" />
				<Button css="hover:bg-(--clr-accent2) hover:shadow-[0_0_10px_0_var(--clr-accent2)]" action={() => console.log("clicked my account")} content="Get Started" />
			</div>
			{props.promotion ? <Promotion data={props.promotion} /> : <></>}
		</header>
	);
}
