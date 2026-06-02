import { svg_props } from "@/app/[locale]/types/svg_icon";

export default function Processing(props: svg_props) {
	return (
		<svg
			className={props.css}
			width={`${props.s || props.w}px` || "50px"}
			height={`${props.s || props.h}px` || "50px"}
			stroke={props.color || "currentColor"}
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			{/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-cw" aria-hidden="true"></svg> */}
			<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
			<path d="M21 3v5h-5"></path>
			<path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
			<path d="M8 16H3v5"></path>
		</svg>
	);
}
