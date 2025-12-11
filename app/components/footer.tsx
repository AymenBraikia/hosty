import Image from "next/image";
import Link from "next/link";
import logoIcon from "../../public/logo.png";
import Twitter from "./svg/twitter";
import Github from "./github";
import Linkedin from "./linkedin";
import Youtube from "./svg/youtube";
import Facebook from "./svg/facebook";

export default function Footer() {
	return (
		<footer className="w-dvw min-h-[50dvh] bg-(--clr-surface2) flex flex-col p-26 pb-8 gap-8">
			<div className="w-full flex justify-between items-center gap-8">
				<div className="flex flex-col justify-start items-start w-[30%] gap-7 h-[250px]">
					<Link className="flex justify-start items-center text-(--clr-primary) font-bold text-2xl" href={"/"}>
						<Image width={45} height={45} src={logoIcon} alt="logo" />
						Hosty
					</Link>
					<p className="text-gray-400">Hosty provides high-performance cloud infrastructure for developers who care about speed, uptime, and design.</p>
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
					<h4 className="font-bold text-xl">Platform</h4>
					<Link className="transition text-gray-400 hover:translate-x-2 hover:text-foreground" href={"#"}>
						Compute
					</Link>
					<Link className="transition text-gray-400 hover:translate-x-2 hover:text-foreground" href={"#"}>
						Storage
					</Link>
					<Link className="transition text-gray-400 hover:translate-x-2 hover:text-foreground" href={"#"}>
						Databases
					</Link>
					<Link className="transition text-gray-400 hover:translate-x-2 hover:text-foreground" href={"#"}>
						Networking
					</Link>
					<Link className="transition text-gray-400 hover:translate-x-2 hover:text-foreground" href={"#"}>
						security
					</Link>
				</div>
				<div className="flex justify-start items-start flex-col gap-4 h-[250px]">
					<h4 className="font-bold text-xl">Company</h4>
					<Link className="transition text-gray-400 hover:translate-x-2 hover:text-foreground" href={"#"}>
						About
					</Link>
					<Link className="transition text-gray-400 hover:translate-x-2 hover:text-foreground" href={"#"}>
						Blog
					</Link>
					<Link className="transition text-gray-400 hover:translate-x-2 hover:text-foreground" href={"#"}>
						Careers
					</Link>
					<Link className="transition text-gray-400 hover:translate-x-2 hover:text-foreground" href={"#"}>
						Customers
					</Link>
					<Link className="transition text-gray-400 hover:translate-x-2 hover:text-foreground" href={"#"}>
						Brand
					</Link>
				</div>
				<div className="flex justify-start items-start flex-col gap-4 h-[250px]">
					<h4 className="font-bold text-xl">Resources</h4>
					<Link className="transition text-gray-400 hover:translate-x-2 hover:text-foreground" href={"#"}>
						Documentation
					</Link>
					<Link className="transition text-gray-400 hover:translate-x-2 hover:text-foreground" href={"#"}>
						API Reference
					</Link>
					<Link className="transition text-gray-400 hover:translate-x-2 hover:text-foreground" href={"#"}>
						Status
					</Link>
					<Link className="transition text-gray-400 hover:translate-x-2 hover:text-foreground" href={"#"}>
						Community
					</Link>
					<Link className="transition text-gray-400 hover:translate-x-2 hover:text-foreground" href={"#"}>
						Help
					</Link>
				</div>
			</div>
			<hr className="text-gray-800" />
			<div className="flex justify-between items-center text-gray-400">
				<span>© 2026 Hosty Inc. All rights reserved.</span>
				<div className="flex justify-center items-center gap-5">
					<Link className="" href={"#"}>
						Privacy
					</Link>
					<Link className="" href={"#"}>
						Terms
					</Link>
					<Link className="" href={"#"}>
						Sitemap
					</Link>
				</div>
			</div>
		</footer>
	);
}
