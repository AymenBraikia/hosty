"use client";
import Link from "next/link";
import { MouseEvent, useRef } from "react";

export default function Button(props: { type?: "submit" | "button" | "reset"; children_el?: React.JSX.Element; url?: string; action?: (e: MouseEvent) => void; content: string; styles?: React.CSSProperties; css?: string }) {
	const btn = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

	return props.url ? (
		<Link
			ref={btn as React.RefObject<HTMLAnchorElement>}
			onMouseDown={() => {
				if (btn.current) btn.current.style.scale = "0.95";
			}}
			onMouseUp={() => {
				if (btn.current) btn.current.style.scale = "1";
			}}
			onMouseLeave={() => {
				if (btn.current) btn.current.style.scale = "1";
			}}
			href={props.url}
			className={`font-bold p-3 cursor-pointer rounded-2xl bg-transparent duration-100 ${props.css}`}
			style={props.styles}
			onClick={props.action}
		>
			{props.content}
			{props.children_el}
		</Link>
	) : (
		<button
			ref={btn as React.RefObject<HTMLButtonElement>}
			onMouseDown={() => {
				if (btn.current) btn.current.style.scale = "0.9";
			}}
			onMouseUp={() => {
				if (btn.current) btn.current.style.scale = "1";
			}}
			onMouseLeave={() => {
				if (btn.current) btn.current.style.scale = "1";
			}}
			type={props.type}
			className={`font-bold p-3 cursor-pointer rounded-2xl bg-transparent duration-100 ${props.css}`}
			style={props.styles}
			onClick={(e: MouseEvent) => props.action && props.type != "submit" && props.action(e)}
		>
			{props.content}
			{props.children_el}
		</button>
	);
}
