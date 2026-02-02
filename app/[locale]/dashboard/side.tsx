import Button from "../components/button";
import Billing from "../components/svg/billing";
import Out from "../components/svg/out";
import Server from "../components/svg/server";
import Settings from "../components/svg/settings";
import Tiles from "../components/svg/tiles";
import Web from "../components/svg/web";

export default function Side() {
    
	return (
		<nav className="w-64 relative top-[10dvh]">
			<ul className="flex flex-col justify-start items-start gap-5">
				<li className="w-full text-foreground flex justify-start items-center gap-4 bg_anim rounded-2xl px-4 transition hover:bg-(--clr-surface)">
					<Tiles s={24} color="currentColor" />
					<Button css="w-full flex justify-start items-center" content="Overview" url={"/dashboard"} />
				</li>
				<li className="w-full text-foreground flex justify-start items-center gap-4  rounded-2xl px-4 transition hover:bg-(--clr-surface)">
					<Server s={24} color="currentColor" />
					<Button css="w-full flex justify-start items-center" content="Instances" url={"/dashboard/instances"} />
				</li>
				<li className="w-full text-foreground flex justify-start items-center gap-4  rounded-2xl px-4 transition hover:bg-(--clr-surface)">
					<Web s={24} color="currentColor" />
					<Button css="w-full flex justify-start items-center" content="Domains" url={"/dashboard/domains"} />
				</li>
				<li className="w-full text-foreground flex justify-start items-center gap-4  rounded-2xl px-4 transition hover:bg-(--clr-surface)">
					<Billing s={24} color="currentColor" />
					<Button css="w-full flex justify-start items-center" content="Billing" url={"/dashboard/billing"} />
				</li>
				<li className="w-full text-foreground flex justify-start items-center gap-4  rounded-2xl px-4 transition hover:bg-(--clr-surface)">
					<Settings s={24} color="currentColor" />
					<Button css="w-full flex justify-start items-center" content="Settings" url={"/dashboard/settings"} />
				</li>
				<li className="w-full text-red-400 flex justify-start items-center gap-4  rounded-2xl px-4 transition hover:bg-(--clr-surface)">
					<Out s={32} color="currentColor" />
					<Button css="w-full flex justify-start items-center" content="Sign Out" url={"#"} />
				</li>
			</ul>
		</nav>
	);
}
