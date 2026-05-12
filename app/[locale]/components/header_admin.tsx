"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import logoIcon from "../../../public/logo.png";
import Link from "next/link";
import Button from "./button";
import Select from "./select";

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

export default function Header() {
	const [size, setSize] = useState<number>(() => (typeof window !== "undefined" ? innerWidth : 0));
	// const [navState, setNavState] = useState<boolean>(false);

	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const handleResize = () => setSize(innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const lang = useLocale();

	return (
		<header className="w-dvw h-fit p-2.5 bg-(--clr-background-opacity) backdrop-blur-3xl fixed left-0 top-0 flex justify-between items-center px-20 z-50 max-md:px-6">
			<div className="flex justify-center items-center gap-10">
				<Link className="flex justify-center items-center font-bold text-3xl" href={"/"}>
					<Image width={70} height={70} src={logoIcon} alt="logo" />
					<p className="text-transparent [background:var(--gradient)] decoration-0" style={{ backgroundClip: "text" }}>
						Hosty
					</p>
				</Link>
			</div>

			{size >= 1024 || !size ? (
				<>
					<div className="text-center text-[18px] text-(--clr-primary)">You are logged in as admin</div>
					<div className="flex justify-center items-center gap-5">
						<Select
							options={[
								["en", "en"],
								["fr", "fr"],
								["ar", "ar"],
								["es", "es"],
								["de", "de"],
								["ru", "ru"],
							]}
							action={(e) => {
								const val = e.currentTarget.getAttribute("data-val");
								if (!val) return;
								router.replace(pathname, { locale: val });
							}}
							default={lang}
						/>

						<Button url="/admin" css="py-2 px-4 text-xl text-foreground hover:bg-(--clr-primary) transition cursor-pointer" content={"Admin Panel"} />
					</div>
				</>
			) : (
				<></>
			)}
		</header>
	);
}
