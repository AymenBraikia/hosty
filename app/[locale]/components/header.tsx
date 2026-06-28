"use client";
import { useContext, useState } from "react";
import Image from "next/image";
import logoIcon from "../../../public/logo.png";
import Link from "next/link";
import Button from "./button";
import Select from "./select";
import Promotion from "./promotion";
import Burger from "./svg/burger";
import Cross from "./svg/cross";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import Cart from "./svg/cart";
import Wish from "./svg/wish";
import user_data from "../context/user_data";
import UserData from "../types/user_ctx";
import Web from "./svg/web";
import Book from "./svg/book";
import Dashboard from "./svg/dashboard";
import Language from "./svg/language";
import Cpu from "./svg/cpu";
import Expand from "./svg/expand";
import Server from "./svg/server";
import Billing from "./svg/billing";
import Settings from "./svg/settings";

export default function Header(props: { promotion?: { url?: string; content: string; expire_date: number } }) {
    const [navState, setNavState] = useState<boolean>(false);

    const router = useRouter();
    const pathname = usePathname();

    const lang = useLocale();

    const data = useContext(user_data) as UserData;

    return (
        <header className="w-dvw h-fit px-5 lg:px-0 py-2.5 bg-(--clr-background-opacity) backdrop-blur-3xl fixed left-0 top-0 flex justify-between items-center z-50">
            <div className="flex justify-start items-center gap-10 w-3/5 sm:w-3/10 lg:w-[15%]">
                <Link className="flex justify-center items-center font-bold text-3xl" href={"/"}>
                    <Image width={70} height={70} src={logoIcon} alt="logo" priority />
                    <p className="text-transparent [background:var(--gradient)] decoration-0" style={{ backgroundClip: "text" }}>
                        Hosty
                    </p>
                </Link>
            </div>
            <div className="md:flex justify-center items-center gap-4 hidden w-2/5 lg:w-[60%] lg:relative left-[5dvw]">
                <div className="md:flex hidden justify-center items-center gap-6 text-[18px]">
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
            </div>
            <div className="sm:flex  justify-center items-center gap-4 hidden w-3/5 md:2-5 lg:w-[25%]">
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
                                    <span className="w-fit min-w-4.5 flex justify-center items-center aspect-square text-white text-xs bg-(--clr-primary) rounded-full absolute top-1/2 left-1/2 -translate-y-6 translate-x-2 font-bold">
                                        {data.cart.length}
                                    </span>
                                ) : (
                                    <></>
                                )}
                            </Link>
                            <Link href={"/wish_list"} className="relative p-2 text-gray-500 hover:text-(--clr-primary) transition cursor-pointer">
                                <Wish s={40} color="currentColor" />
                                {data.wish_list.length ? (
                                    <span className="w-fit min-w-4.5 flex justify-center items-center aspect-square text-white text-xs bg-(--clr-primary) rounded-full absolute top-1/2 left-1/2 -translate-y-6 translate-x-2 font-bold">
                                        {data.wish_list.length}
                                    </span>
                                ) : (
                                    <></>
                                )}
                            </Link>
                            <Button url="/dashboard" css="py-2 px-4 md:text-[16px] text-xl text-foreground hover:bg-(--clr-primary) transition cursor-pointer" content={"Dashboard"} />
                        </>
                    ) : (
                        <>
                            <Button css="hover:bg-(--clr-accent) hover:shadow-[0_0_10px_0_var(--clr-accent)] transition" url="/login" content="Log in" />
                            <Button css="hover:bg-(--clr-accent2) hover:shadow-[0_0_10px_0_var(--clr-accent2)] transition" url="/get_started" content="Get Started" />
                        </>
                    )}
                </div>
            </div>
            <div className="sm:hidden flex justify-center items-center">
                <Button action={() => setNavState(true)} children_el={<Burger s={30} />} />
            </div>

            <Nav close={() => setNavState(false)} active={navState} />
            {props.promotion && <Promotion data={props.promotion} />}
        </header>
    );
}

function Nav({ active, close }: { active: boolean; close: () => void }) {
    const router = useRouter();
    const pathname = usePathname();

const segments = pathname.split("/");
const route = ["instances", "domains", "billing", "settings"].find((seg) => segments.includes(seg)) ?? "dashboard";

    const lang = useLocale();

    const [expand_dashboard, set_expend_dashboard] = useState<boolean>(false);

    const data = useContext(user_data) as UserData;
    return (
        <nav className={`sm:hidden w-dvw h-dvh flex flex-col justify-start items-start gap-20 py-20 px-5 fixed left-0 top-0 transition ${active ? "translate-x-0" : "translate-x-full"} z-50 bg-black/60 overflow-y-auto`}>
            <Button css="absolute top-5 right-5" action={close} children_el={<Cross s={30} />} />
            <div className="flex flex-col justify-center items-start gap-6 text-[18px]">
                <Link className="text-white hover:text-gray-400 transition flex gap-4 justify-center items-center" href={"/hosting"}>
                    {<Cpu s={20} />} Hosting
                </Link>
                <Link className="text-white hover:text-gray-400 transition flex gap-4 justify-center items-center" href={"/domain"}>
                    {<Web s={20} />} Domains
                </Link>
                <Link className="text-white hover:text-gray-400 transition flex gap-4 justify-center items-center" href={"/docs"}>
                    {<Book s={20} />} Docs
                </Link>
                <Button
                    action={() => set_expend_dashboard(!expand_dashboard)}
                    children_el={<Expand s={30} css={`transition ${expand_dashboard ? "rotate-180" : "rotate-0"}`} />}
                    css="text-white hover:text-gray-400 transition flex gap-4 justify-center items-center"
                    content={"Dashboard"}
                />
                <div className={`text-white w-full flex flex-col justify-between items-start gap-4 transition overflow-hidden ${expand_dashboard ? "h-fit" : "h-0"}`}>
                    <Link className={`hover:text-gray-400 transition flex gap-4 justify-center items-center ${route == "dashboard" && "text-(--clr-primary)"}`} href={"/dashboard"}>
                        {<Dashboard s={20} />} Overview
                    </Link>
                    <Link className={`hover:text-gray-400 transition flex gap-4 justify-center items-center ${route == "instances" && "text-(--clr-primary)"}`} href={"/dashboard/instances"}>
                        {<Server s={20} />} Instances
                    </Link>
                    <Link className={`hover:text-gray-400 transition flex gap-4 justify-center items-center ${route == "domains" && "text-(--clr-primary)"}`} href={"/dashboard/domains"}>
                        {<Web s={20} />} Domains
                    </Link>
                    <Link className={`hover:text-gray-400 transition flex gap-4 justify-center items-center ${route == "billing" && "text-(--clr-primary)"}`} href={"/dashboard/billing"}>
                        {<Billing s={20} />} Billing
                    </Link>
                    <Link className={`hover:text-gray-400 transition flex gap-4 justify-center items-center ${route == "settings" && "text-(--clr-primary)"}`} href={"/dashboard/settings"}>
                        {<Settings s={20} />} Settings
                    </Link>
                </div>
            </div>

            <div className="flex justify-center items-center gap-4">
                <div className="flex flex-col justify-center items-start gap-5">
                    <div className="flex justify-start items-center gap-4">
                        <Language s={30} />
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
                    </div>

                    {data ? (
                        <>
                            <Link href={"/cart"} className="relative flex justify-center text-[18px] font-bold items-center gap-4 text-white hover:text-(--clr-primary) transition cursor-pointer">
                                <Cart s={30} color="currentColor" /> Cart
                                {data.cart.length ? (
                                    <span className="w-fit min-w-4.5 flex justify-center items-center aspect-square text-white text-xs bg-(--clr-primary) rounded-full absolute top-1/2 left-1/2 -translate-y-6 translate-x-2 font-bold">
                                        {data.cart.length}
                                    </span>
                                ) : (
                                    <></>
                                )}
                            </Link>
                            <Link href={"/wish_list"} className="relative flex justify-center text-[18px] font-bold items-center gap-4 text-white hover:text-(--clr-primary) transition cursor-pointer">
                                <Wish s={40} color="currentColor" /> Wishlist
                                {data.wish_list.length ? (
                                    <span className="w-fit min-w-4.5 flex justify-center items-center aspect-square text-white text-xs bg-(--clr-primary) rounded-full absolute top-1/2 left-1/2 -translate-y-6 translate-x-2 font-bold">
                                        {data.wish_list.length}
                                    </span>
                                ) : (
                                    <></>
                                )}
                            </Link>
                        </>
                    ) : (
                        <>
                            <Button css="hover:bg-(--clr-accent) hover:shadow-[0_0_10px_0_var(--clr-accent)] transition" url="/login" content="Log in" />
                            <Button css="hover:bg-(--clr-accent2) hover:shadow-[0_0_10px_0_var(--clr-accent2)] transition" url="/get_started" content="Get Started" />
                        </>
                    )}
                </div>
            </div>

            <div className="flex flex-col justify-center items-start gap-4 text-[18px]">
                <Link className="text-white hover:text-gray-400 transition flex gap-4 justify-center items-center" href={"#"}>
                    Terms
                </Link>
                <Link className="text-white hover:text-gray-400 transition flex gap-4 justify-center items-center" href={"#"}>
                    Privacy Policy
                </Link>
                <Link className="text-white hover:text-gray-400 transition flex gap-4 justify-center items-center" href={"#"}>
                    About
                </Link>
                <Link className="text-white hover:text-gray-400 transition flex gap-4 justify-center items-center" href={"#"}>
                    Career
                </Link>
                <Link className="text-white hover:text-gray-400 transition flex gap-4 justify-center items-center" href={"#"}>
                    Help
                </Link>
                <Link className="text-white hover:text-gray-400 transition flex gap-4 justify-center items-center" href={"#"}>
                    Contact
                </Link>
            </div>
        </nav>
    );
}
