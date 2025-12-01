import Dock from "./dock";
import home_icon from "../../public/home.svg";
import Image from "next/image";

export default function Header() {
	return (
		<header className="w-dvw h-fit p-2.5 absolute left-0 top-0 flex">
			<Dock
				items={[
					{ title: "home", icon: <Image src={home_icon} fill className="p-2" alt={"home"} />, url: "#" },
					{ title: "home", icon: <Image src={home_icon} fill className="p-2" alt={"home"} />, url: "#" },
					{ title: "home", icon: <Image src={home_icon} fill className="p-2" alt={"home"} />, url: "#" },
					{ title: "home", icon: <Image src={home_icon} fill className="p-2" alt={"home"} />, url: "#" },
				]}
			/>
		</header>
	);
}
