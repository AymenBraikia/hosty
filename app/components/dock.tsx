"use client";
import Link from "next/link";
import { JSX } from "react";

type item = {
	icon: JSX.Element;
	url: string;
	title: string;
};

export default function Dock(props: { items: item[] }) {
	return (
		<div className="w-fit h-fit flex gap-0.5 justify-center items-center bg-gray-600">
			{props.items.map((item, i) => {
				return (
					<Link className="dock_icon relative w-14 aspect-square transition-(--transition) bg-transparent" onMouseLeave={mouse_out} onMouseEnter={mouse_in} key={i} title={item.title} href={item.url}>
						{item.icon}
					</Link>
				);
			})}
		</div>
	);
}

function mouse_out(e: React.MouseEvent) {
	const target = e.currentTarget as HTMLElement;
	target.style.width = "56px";
	target.style.height = "56px";
}
function mouse_in(e: React.MouseEvent) {
	const target = e.currentTarget as HTMLElement;
	target.style.width = 56 * 1.25 + "px";
	target.style.height = 56 * 1.25 + "px";
}
