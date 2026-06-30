"use client";

import { usePathname, useRouter } from "next/navigation";
import Button from "../components/button";
import Billing from "../components/svg/billing";
import Out from "../components/svg/out";
import Server from "../components/svg/server";
import Settings from "../components/svg/settings";
import Tiles from "../components/svg/tiles";
import Web from "../components/svg/web";
import { signOut } from "../actions/auth/sign_out";

const navItems = [
    { icon: Tiles, label: "Overview", url: "/dashboard" },
    { icon: Server, label: "Instances", url: "/dashboard/instances" },
    { icon: Web, label: "Domains", url: "/dashboard/domains" },
    { icon: Billing, label: "Billing", url: "/dashboard/billing" },
    { icon: Settings, label: "Settings", url: "/dashboard/settings" },
];

export default function Side() {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <nav className="w-40 relative top-[10dvh] lg:flex hidden">
            <ul className="flex flex-col justify-start items-start gap-5 w-full">
                {navItems.map(({ icon: Icon, label, url }) => {
                    const isActive = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, "") === url;
                    return (
                        <li
                            key={url}
                            className={`w-full flex justify-start items-center gap-4 rounded-2xl px-4 transition
                ${
                    isActive
                        ? "bg_anim text-foreground" // active styles
                        : "text-foreground hover:bg-(--clr-surface)" // default styles
                }`}
                        >
                            <Icon s={24} color="currentColor" />
                            <Button css="w-full flex justify-start items-center" content={label} url={url} />
                        </li>
                    );
                })}

                <li className="w-full text-red-400 flex justify-start items-center gap-4 rounded-2xl px-4 transition hover:bg-(--clr-surface)">
                    <Out s={32} color="currentColor" />
                    <Button
                        css="w-full flex justify-start items-center"
                        action={() => {
                            router.prefetch("/login");
                            signOut().then(() => router.push("/login"));
                        }}
                        content="Sign Out"
                    />
                </li>
            </ul>
        </nav>
    );
}
