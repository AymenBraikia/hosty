"use client";
import { useRef, useState } from "react";

export default function Check_box(props: { action?: (state: boolean) => void; display_status?: boolean; state: boolean; label?: string; styles?: React.CSSProperties; css?: string }) {
	const btn = useRef<HTMLDivElement>(null);
	const [active, set_active] = useState<boolean>(props.state);

	return (
		<div
			ref={btn as React.RefObject<HTMLDivElement>}
			className={`p-3 cursor-pointer transition flex gap-2 justify-start items-center ${active ? "text-(--clr-primary)" : "text-gray-400"} ${props.css}`}
			style={props.styles}
			onClick={() => {
				set_active(!active);
				if (props.action) props.action(active);
			}}
		>
			{props.label}
			<div className={`w-8 h-5 relative border-[3px] border-current rounded-2xl transition ${active ? "bg-(--clr-primary-opacity)" : "bg-gray-400/20"}`}>
				<div className={`rounded-full border-[3px] border-current w-3 aspect-square absolute top-1/2 -translate-y-1/2 transition ${active ? "left-9/10 -translate-x-full" : "left-1/10"}`}></div>
			</div>
			{props.display_status && (active ? "On" : "Off")}
		</div>
	);
}
