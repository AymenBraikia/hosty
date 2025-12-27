import { svg_props } from "@/app/[locale]/types/svg_icon";

export default function Burger(props: svg_props) {
	return (
		<svg className={props.css} width={`${props.s || props.w}px` || "50px"} height={`${props.s || props.h}px` || "50px"} fill="none" stroke={props.color || "black"} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M4 12h16"></path>
			<path d="M4 18h16"></path>
			<path d="M4 6h16"></path>
		</svg>
	);
}
