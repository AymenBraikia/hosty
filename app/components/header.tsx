"use client";
import { useState } from "react";
import Image from "next/image";
import logoIcon from "../../public/logo.png";
import Link from "next/link";
import Button from "./button";
import Select from "./select";

type langs = "en-us" | "en-uk" | "ar-dz" | "es-es" | "ru-ru";
export default function Header() {
	const [lang, set_lang] = useState<langs | string>(() => (typeof window !== "undefined" && (localStorage.getItem("lang") as langs)) || "en-us");

	return (
		<header className="w-dvw h-fit p-2.5 bg-(--clr-surface) fixed left-0 top-0 flex justify-between items-center px-20">
			<div className="flex justify-center items-center gap-10">
				<Link className="flex justify-center items-center text-(--clr-primary) font-bold text-3xl gap-2.5" href={"/"}>
					<Image width={70} height={70} src={logoIcon} alt="logo" />
					Hosty
				</Link>

				<div className="flex justify-center items-center gap-6">
					<Link className="text-[18px] text-gray-200 hover:text-gray-400 transition" href={"#"}>
						home
					</Link>
					<Link className="text-[18px] text-gray-200 hover:text-gray-400 transition" href={"#"}>
						home
					</Link>
					<Link className="text-[18px] text-gray-200 hover:text-gray-400 transition" href={"#"}>
						home
					</Link>
					<Link className="text-[18px] text-gray-200 hover:text-gray-400 transition" href={"#"}>
						home
					</Link>
					<Link className="text-[18px] text-gray-200 hover:text-gray-400 transition" href={"#"}>
						home
					</Link>
				</div>
			</div>
			<div className="flex justify-center items-center gap-10">
				<Select
					options={[
						["en-us", "en-us"],
						["en-uk", "en-uk"],
						["ar-dz", "ar-dz"],
						["es-es", "es-es"],
						["ru-ru", "ru-ru"],
					]}
					action={(e) => {
						const val = e.currentTarget.getAttribute("data-val");
						if (!val) return;
						localStorage.setItem("lang", val);
						set_lang(val);
					}}
					default={lang}
				/>
				<Button action={() => console.log("clicked my account")} content="My Account" />
			</div>
		</header>
	);
}
