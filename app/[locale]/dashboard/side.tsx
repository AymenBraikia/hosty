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
	{ icon: Tiles, label: "Overview", url: "/dashboard" },
	{ icon: Server, label: "Instances", url: "/dashboard/instances" },
	{ icon: Web, label: "Domains", url: "/dashboard/domains" },
	{ icon: Billing, label: "Billing", url: "/dashboard/billing" },
	{ icon: Settings, label: "Settings", url: "/dashboard/settings" },
];

export default function Side() {
	const pathname = usePathname();

	return (
		<nav className="w-64 relative top-[10dvh]">
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
					<Button css="w-full flex justify-start items-center" content="Sign Out" url="#" />
				</li>
			</ul>
		</nav>
	);
}
