"use client";
import Image from "next/image";
import logoIcon from "../../public/logo.png";
import Link from "next/link";
import Button from "./button";

export default function Header() {
	return (
		<header className="w-dvw h-fit p-2.5 bg-[var(--clr-surface)] fixed left-0 top-0 flex justify-between items-center px-20">
			<div className="flex justify-center items-center gap-10">
				<Link className="flex justify-center items-center text-[var(--clr-primary)] font-bold text-3xl gap-2.5" href={"/"}>
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
				<select className="text-xl focus:bg-[var(--clr-surface)]">
					<option value="en-us">en-us</option>
					<option value="en-uk">en-uk</option>
					<option value="ar-dz">ar-dz</option>
					<option value="es-es">es-es</option>
					<option value="ru-ru">ru-ru</option>
				</select>
				<Button action={() => console.log("clicked my account")} content="My Account" />
			</div>
		</header>
	);
}
