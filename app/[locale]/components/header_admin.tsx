"use client";
import { useState } from "react";
import Image from "next/image";
import logoIcon from "../../../public/logo.png";
import Link from "next/link";
import Button from "./button";
import Select from "./select";

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import Language from "./svg/language";
import Settings from "./svg/settings";
import Dashboard from "./svg/dashboard";
import Server from "./svg/server";
import Web from "./svg/web";
import Billing from "./svg/billing";
import Cross from "./svg/cross";
import Burger from "./svg/burger";
import Out from "../components/svg/out";
import User from "./svg/user";

export default function Header() {
    const [navState, setNavState] = useState<boolean>(false);

    return (
        <header className="w-dvw h-fit p-2.5 bg-(--clr-background-opacity) backdrop-blur-3xl fixed left-0 top-0 flex justify-between items-center px-20 z-50 max-md:px-6">
            <div className="w-full flex justify-between items-center gap-10">
                <Link className="flex justify-center items-center font-bold text-3xl" href={"/"}>
                    <Image width={70} height={70} src={logoIcon} alt="logo" />
                    <p className="text-transparent [background:var(--gradient)] decoration-0" style={{ backgroundClip: "text" }}>
                        Hosty
                    </p>
                </Link>
                <Button children_el={<Burger s={30} />} action={() => setNavState(!navState)} />
            </div>
            <Nav close={() => setNavState(false)} active={navState} />
        </header>
    );
}

function Nav({ active, close }: { active: boolean; close: () => void }) {
    const router = useRouter();
    const pathname = usePathname();

    const segments = pathname.split("/");
    const route = ["admin", "inventory", "orders", "users", "system"].find((seg) => segments.includes(seg)) ?? "admin";

    const lang = useLocale();

    return (
        <nav className={`sm:hidden w-dvw h-dvh flex flex-col justify-start items-start gap-20 py-20 px-5 fixed left-0 top-0 transition ${active ? "translate-x-0" : "translate-x-full"} z-50 bg-black/80 overflow-y-auto`}>
            <Button css="absolute top-5 right-5" action={close} children_el={<Cross s={30} />} />
            <div className="flex flex-col justify-center items-start gap-6 text-[18px]">
                <div className={`text-white w-full flex flex-col justify-between items-start gap-4 transition overflow-hidden h-fit`}>
                    <Link className={`hover:text-gray-400 transition flex gap-4 justify-center items-center ${route == "/admin" && "text-(--clr-primary)"}`} href={"/admin"}>
                        {<Dashboard s={20} />} Analytics
                    </Link>
                    <Link className={`hover:text-gray-400 transition flex gap-4 justify-center items-center ${route == "inventory" && "text-(--clr-primary)"}`} href={"/admin/inventory"}>
                        {<Server s={20} />} Inventory
                    </Link>
                    <Link className={`hover:text-gray-400 transition flex gap-4 justify-center items-center ${route == "users" && "text-(--clr-primary)"}`} href={"/admin/users"}>
                        {<User s={20} />} Users
                    </Link>
                    <Link className={`hover:text-gray-400 transition flex gap-4 justify-center items-center ${route == "orders" && "text-(--clr-primary)"}`} href={"/admin/orders"}>
                        {<Billing s={20} />} Recent Orders
                    </Link>
                    <Link className={`hover:text-gray-400 transition flex gap-4 justify-center items-center ${route == "system" && "text-(--clr-primary)"}`} href={"/admin/system"}>
                        {<Settings s={20} />} System
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
                    <div className="w-full text-red-400 flex justify-start items-center gap-4 rounded-2xl">
                        <Out s={40} color="currentColor" />
                        <Button css="w-full flex justify-start items-center" action={async () => await fetch("/api/sign_out", { method: "POST" })} content="Sign Out" url="/login" />
                    </div>
                </div>
            </div>
        </nav>
    );
}
