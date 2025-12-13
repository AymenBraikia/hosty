"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import logoIcon from "../../public/logo.png";
import Link from "next/link";
import Button from "./button";
import Select from "./select";
import Promotion from "./promotion";
import Burger from "./svg/burger";
import Cross from "./svg/cross";

type langs = "en-us" | "en-uk" | "ar-dz" | "es-es" | "ru-ru";
export default function Header(props: { promotion?: { url?: string; content: string; expire_date: number } }) {
	const [size, setSize] = useState<number>(() => (typeof window !== "undefined" ? innerWidth : 0));
	const [navState, setNavState] = useState<boolean>(false);

	useEffect(() => {
		const handleResize = () => setSize(innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	const [lang, set_lang] = useState<langs | string>(() => (typeof window !== "undefined" && (localStorage.getItem("lang") as langs)) || "en-us");
	return (
		<header className="w-dvw h-fit p-2.5 bg-(--clr-surface) fixed left-0 top-0 flex justify-between items-center px-20 z-50 max-md:px-6">
			<div className="flex justify-center items-center gap-10">
				<Link className="flex justify-center items-center text-(--clr-primary) font-bold text-3xl" href={"/"}>
					<Image width={70} height={70} src={logoIcon} alt="logo" />
					Hosty
				</Link>
			</div>

			{size >= 1024 ? (
				<>
					<div className="flex justify-center items-center gap-6 text-[18px]">
						<Link className="underline_anim text-gray-400 hover:text-gray-200 transition" href={"#"}>
							Hosting
						</Link>
						<Link className="underline_anim text-gray-400 hover:text-gray-200 transition" href={"#"}>
							VPS
						</Link>
						<Link className="underline_anim text-gray-400 hover:text-gray-200 transition" href={"#"}>
							Dedicated
						</Link>
						<Link className="underline_anim text-gray-400 hover:text-gray-200 transition" href={"#"}>
							Domains
						</Link>
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
				</>
			) : (
				<>
					{!navState && (
						<div onClick={() => setNavState(!navState)} className="cursor-pointer">
							<Burger color="var(--clr-primary)" s={30} />
						</div>
					)}
					<nav className={`z-50 flex transition flex-col gap-6 p-8 fixed ${navState ? "right-0" : "-right-full"} top-0 w-dvw h-dvh bg-(--clr-foreground-opacity2) [backdrop-filter:blur(40px)]`}>
						<div className="flex flex-col justify-center items-start gap-6">
							<Link className="text-[18px] underline_anim text-foreground hover:text-gray-200 transition" href={"#"}>
								Hosting
							</Link>
							<Link className="text-[18px] underline_anim text-foreground hover:text-gray-200 transition" href={"#"}>
								VPS
							</Link>
							<Link className="text-[18px] underline_anim text-foreground hover:text-gray-200 transition" href={"#"}>
								Dedicated
							</Link>
							<Link className="text-[18px] underline_anim text-foreground hover:text-gray-200 transition" href={"#"}>
								Domains
							</Link>
							<Link className="text-[18px] underline_anim text-foreground hover:text-gray-200 transition" href={"#"}>
								Support
							</Link>
							<Link className="text-[18px] underline_anim text-foreground hover:text-gray-200 transition" href={"#"}>
								Self-hosted n8n
							</Link>
						</div>
						<div className="flex flex-col justify-center items-start gap-6">
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

						<div onClick={() => setNavState(!navState)} className="absolute right-20 top-8 cursor-pointer">
							<Cross color="var(--clr-primary)" s={30} />
						</div>
					</nav>
				</>
			)}
			{props.promotion && <Promotion data={props.promotion} />}
		</header>
	);
}
