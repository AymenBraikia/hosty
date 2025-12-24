import { svg_props } from "@/app/types/svg_icon";

export default function Cross(props: svg_props) {
	return (
		<svg className={props.css} width={`${props.s || props.w}px` || "50px"} height={`${props.s || props.h}px` || "50px"} stroke={props.color || "black"} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M18 6 6 18"></path>
			<path d="m6 6 12 12"></path>
		</svg>
	);
}
