"use client";
import { useRef } from "react";

export default function Check_box(props: { action?: (state: boolean) => Promise<unknown>; display_status?: boolean; state: boolean; label?: string; styles?: React.CSSProperties; css?: string }) {
	// export default function Check_box(props: { action?: Promise<boolean>; display_status?: boolean; state: boolean; label?: string; styles?: React.CSSProperties; css?: string }) {
	const btn = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={btn as React.RefObject<HTMLDivElement>}
			className={`p-3 cursor-pointer transition flex gap-2 items-center font-bold ${props.state ? "text-(--clr-primary)" : "text-gray-400"} ${props.css}`}
			style={props.styles}
			onClick={props.action?.bind(null, !props.state)}
		>
			{props.label}
			<div className={`w-8 h-5 relative border-[3px] border-current rounded-2xl transition ${props.state ? "bg-(--clr-primary-opacity)" : "bg-gray-400/20"}`}>
				<div className={`rounded-full border-[3px] border-current w-3 aspect-square absolute top-1/2 -translate-y-1/2 transition ${props.state ? "left-9/10 -translate-x-full" : "left-1/10"}`}></div>
			</div>
			{props.display_status && (props.state ? "On" : "Off")}
		</div>
	);
}
