import Image from "next/image";
import Link from "next/link";
import logoIcon from "../../../public/logo.png";
import Twitter from "./svg/twitter";
import Github from "./github";
import Linkedin from "./linkedin";
import Youtube from "./svg/youtube";
import Facebook from "./svg/facebook";
import { useTranslations } from "next-intl";

export default function Footer() {
	const t = useTranslations("footer");

	return (
		<footer className="w-dvw min-h-[50dvh] bg-(--clr-surface2) flex flex-col p-26 pb-8 gap-8 max-md:px-6">
			<div className="w-full flex justify-between items-center gap-8 max-md:flex-row flex-wrap">
				<div className="flex flex-col justify-start items-start w-[30%] gap-7 h-[250px] max-md:w-full">
					<Link className="flex justify-start items-center text_anim font-bold text-2xl" href={"/"}>
						<Image width={45} height={45} src={logoIcon} alt="logo" />
						Hosty
					</Link>
					<p className="text-gray-400">{t("description")}</p>
					<div className="flex justify-start items-center gap-2">
						<Link href={"#"} className="w-12 aspect-square flex justify-center items-center text-gray-400 bg-gray-400/20 hover:text-(--clr-primary) hover:bg-(--clr-primary-opacity) cursor-pointer transition rounded-full">
							<Twitter s={25} color="currentColor" />
						</Link>
						<Link href={"#"} className="w-12 aspect-square flex justify-center items-center text-gray-400 bg-gray-400/20 hover:text-(--clr-primary) hover:bg-(--clr-primary-opacity) cursor-pointer transition rounded-full">
							<Github s={25} color="currentColor" />
						</Link>
						<Link href={"#"} className="w-12 aspect-square flex justify-center items-center text-gray-400 bg-gray-400/20 hover:text-(--clr-primary) hover:bg-(--clr-primary-opacity) cursor-pointer transition rounded-full">
							<Linkedin s={25} color="currentColor" />
						</Link>
						<Link href={"#"} className="w-12 aspect-square flex justify-center items-center text-gray-400 bg-gray-400/20 hover:text-(--clr-primary) hover:bg-(--clr-primary-opacity) cursor-pointer transition rounded-full">
							<Youtube s={25} color="currentColor" />
						</Link>
						<Link href={"#"} className="w-12 aspect-square flex justify-center items-center text-gray-400 bg-gray-400/20 hover:text-(--clr-primary) hover:bg-(--clr-primary-opacity) cursor-pointer transition rounded-full">
							<Facebook s={25} color="currentColor" />
						</Link>
					</div>
				</div>
				<div className="flex justify-start items-start flex-col gap-4 h-[250px]">
					<h4 className="font-bold text-xl">{t("sections.platform.title")}</h4>
					{t.raw("sections.platform.links").map((l: string, i: number) => (
						<Link key={i} className="transition text-gray-400 hover:translate-x-2 hover:text-foreground" href={`/${l}`}>
							{l}
						</Link>
					))}
				</div>
				<div className="flex justify-start items-start flex-col gap-4 h-[250px]">
					<h4 className="font-bold text-xl">{t("sections.company.title")}</h4>
					{t.raw("sections.company.links").map((l: string, i: number) => (
						<Link key={i} className="transition text-gray-400 hover:translate-x-2 hover:text-foreground" href={`/${l}`}>
							{l}
						</Link>
					))}
				</div>
				<div className="flex justify-start items-start flex-col gap-4 h-[250px]">
					<h4 className="font-bold text-xl">{t("sections.resources.title")}</h4>
					{t.raw("sections.resources.links").map((l: string, i: number) => (
						<Link key={i} className="transition text-gray-400 hover:translate-x-2 hover:text-foreground" href={`/${l}`}>
							{l}
						</Link>
					))}
				</div>
			</div>
			<hr className="text-gray-800" />
			<div className="flex justify-between items-center text-gray-400 max-md:flex-col max-md:gap-4">
				<span>{t("copyright")}</span>
				<div className="flex justify-center items-center gap-5">
					{t.raw("policies").map((p: string, i: number) => (
						<Link key={i} href={p}>
							{p}
						</Link>
					))}
					{/* <Link className="" href={"#"}>
						Privacy
					</Link>
					<Link className="" href={"#"}>
						Terms
					</Link>
					<Link className="" href={"#"}>
						Sitemap
					</Link> */}
				</div>
			</div>
		</footer>
	);
}
