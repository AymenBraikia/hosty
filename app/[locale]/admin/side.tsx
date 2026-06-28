"use client";

import { usePathname } from "next/navigation";
import Button from "../components/button";
import Billing from "../components/svg/billing";
import Out from "../components/svg/out";
import Server from "../components/svg/server";
import Settings from "../components/svg/settings";
import Tiles from "../components/svg/tiles";
import Web from "../components/svg/web";

const navItems = [
	{ icon: Tiles, label: "Analytics", url: "/admin" },
	{ icon: Server, label: "Inventory", url: "/admin/inventory" },
	{ icon: Web, label: "Recent Orders", url: "/admin/orders" },
	{ icon: Billing, label: "Users", url: "/admin/users" },
	{ icon: Settings, label: "System", url: "/admin/system" },
];

export default function Side() {
	const pathname = usePathname();

	return (
		<nav className="lg:flex hidden w-64 relative top-[10dvh]">
			<ul className="flex flex-col justify-start items-start gap-5">
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
					<Button css="w-full flex justify-start items-center" content="Exit Admin" url="/" />
				</li>
			</ul>
		</nav>
	);
}
