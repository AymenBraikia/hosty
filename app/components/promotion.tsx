import Link from "next/link";
import { useEffect, useState } from "react";

export default function Promotion(props: { data: { url?: string; expire_date: number; content: string } }) {
	const [date, set_date] = useState<string | boolean>("");

	useEffect(() => {
		setInterval(() => {
			const timestamp = Date.now();

			const formatted = format_Date(props.data.expire_date - timestamp);
			if (!formatted) return set_date(false);

			set_date(`${formatted.days}d ${formatted.hours}h ${formatted.minutes}m ${formatted.seconds}s`);
		}, 1e3);
	}, []);

	return !date ? (
		<></>
	) : (
		<Link className="shine w-dvw min-h-10 flex justify-evenly items-center font-bold text-[18px] absolute bottom-0 left-0 translate-y-full bg_anim" href={props.data.url || "#"}>
			<div className="flex justify-center items-center">
				{props.data.content}
				<div className="bg-[#ffffff58] mx-2 px-3.5 rounded-xl">{date}</div>
			</div>
		</Link>
	);
}

export function format_Date(ms: number) {
	if (ms < 0) return;

	const seconds = Math.floor(ms / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	return {
		days,
		hours: hours % 24,
		minutes: minutes % 60,
		seconds: seconds % 60,
	};
}
