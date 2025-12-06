import { svg_props } from "@/app/types/svg_icon";

export default function Code(props: svg_props) {
	return (
		<svg className={props.css} width={`${props.s || props.w}px` || "50px"} height={`${props.s || props.h}px` || "50px"} fill="none" stroke={props.color || "black"} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="m18 16 4-4-4-4"></path>
			<path d="m6 8-4 4 4 4"></path>
			<path d="m14.5 4-5 16"></path>
		</svg>
	);
}
