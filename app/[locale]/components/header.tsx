"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import logoIcon from "../../../public/logo.png";
import Link from "next/link";
import Button from "./button";
import Select from "./select";
import Promotion from "./promotion";
// import Burger from "./svg/burger";
// import Cross from "./svg/cross";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import Cart from "./svg/cart";
import Wish from "./svg/wish";
import user_data from "../context/user_data";
import { domain, hostService } from "../types/product";

export default function Header(props: { promotion?: { url?: string; content: string; expire_date: number } }) {
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

	const data = useContext(user_data) as { wish_list: [domain | hostService]; cart: [domain | hostService]; name: string } | undefined;

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
					<div className="flex justify-center items-center gap-6 text-[18px]">
						<Link className="underline_anim text-gray-400 hover:text-gray-200 transition" href={"/hosting"}>
							Hosting
						</Link>
						<Link className="underline_anim text-gray-400 hover:text-gray-200 transition" href={"/domain"}>
							Domains
						</Link>
						<Link className="underline_anim text-gray-400 hover:text-gray-200 transition" href={"/docs"}>
							Docs
						</Link>
					</div>
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

						{data ? (
							<>
								<Link href={"/cart"} className="relative p-2 text-gray-500 hover:text-(--clr-primary) transition cursor-pointer">
									<Cart s={30} color="currentColor" />
									{data.cart.length ? (
										<span className="w-fit min-w-4.5 flex justify-center items-center aspect-square text-white text-xs bg-(--clr-primary) rounded-full absolute top-1/2 left-1/2 -translate-y-6 translate-x-2 font-bold">{data.cart.length}</span>
									) : (
										<></>
									)}
								</Link>
								<Link href={"/wish_list"} className="relative p-2 text-gray-500 hover:text-(--clr-primary) transition cursor-pointer">
									<Wish s={40} color="currentColor" />
									{data.wish_list.length ? (
										<span className="w-fit min-w-4.5 flex justify-center items-center aspect-square text-white text-xs bg-(--clr-primary) rounded-full absolute top-1/2 left-1/2 -translate-y-6 translate-x-2 font-bold">{data.wish_list.length}</span>
									) : (
										<></>
									)}
								</Link>
								<Button css="py-2 px-4 text-xl text-foreground hover:bg-(--clr-primary) transition cursor-pointer" content={data.name || "Profile"} />
							</>
						) : (
							<>
								<Button css="hover:bg-(--clr-accent) hover:shadow-[0_0_10px_0_var(--clr-accent)] transition" url="/login" content="Log in" />
								<Button css="hover:bg-(--clr-accent2) hover:shadow-[0_0_10px_0_var(--clr-accent2)] transition" url="/get_started" content="Get Started" />
							</>
						)}
					</div>
				</>
			) : (
				<></>
				// 	<>
				// 		{!navState && (
				// 			<div onClick={() => setNavState(!navState)} className="cursor-pointer">
				// 				<Burger color="var(--clr-primary)" s={30} />
				// 			</div>
				// 		)}
				// 		<nav className={`z-50 flex transition flex-col gap-6 p-8 fixed ${navState ? "right-0" : "-right-full"} top-0 w-dvw h-dvh bg-(--clr-foreground-opacity2) [backdrop-filter:blur(40px)]`}>
				// 			<div className="flex flex-col justify-center items-start gap-6">
				// 				<Link className="text-[18px] underline_anim text-foreground hover:text-gray-200 transition" href={"#"}>
				// 					Hosting
				// 				</Link>
				// 				<Link className="text-[18px] underline_anim text-foreground hover:text-gray-200 transition" href={"#"}>
				// 					Domains
				// 				</Link>
				// 				<Link className="text-[18px] underline_anim text-foreground hover:text-gray-200 transition" href={"#"}>
				// 					Support
				// 				</Link>
				// 				<Link className="text-[18px] underline_anim text-foreground hover:text-gray-200 transition" href={"#"}>
				// 					Docs
				// 				</Link>
				// 				<Link className="text-[18px] underline_anim text-foreground hover:text-gray-200 transition" href={"#"}>
				// 					Self-hosted n8n
				// 				</Link>
				// 			</div>
				// 			<div className="flex flex-col justify-center items-start gap-6">
				// 				<Select
				// 					options={[
				// 						["English", "en-us"],
				// 						["French", "fr-fr"],
				// 						["Arabic", "ar-dz"],
				// 						["Spanish", "es-es"],
				// 						["German", "de-de"],
				// 						["Russian", "ru-ru"],
				// 					]}
				// 					action={(e) => {
				// 						const val = e.currentTarget.getAttribute("data-val");
				// 						if (!val) return;
				// 						// setCookie("NEXT_LOCALE", val);
				// 						router.replace(pathname, { locale: val });
				// 					}}
				// 					default={lang}
				// 				/>
				// 				<Button css="hover:bg-(--clr-accent) hover:shadow-[0_0_10px_0_var(--clr-accent)]" action={() => console.log("clicked my account")} content="Log in" />
				// 				<Button css="hover:bg-(--clr-accent2) hover:shadow-[0_0_10px_0_var(--clr-accent2)]" action={() => console.log("clicked my account")} content="Get Started" />
				// 			</div>

				// 			<div onClick={() => setNavState(!navState)} className="absolute right-20 top-8 cursor-pointer">
				// 				<Cross color="var(--clr-primary)" s={30} />
				// 			</div>
				// 		</nav>
				// 	</>
			)}
			{props.promotion && <Promotion data={props.promotion} />}
		</header>
	);
}
