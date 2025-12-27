import { svg_props } from "@/app/[locale]/types/svg_icon";

export default function DataBase(props: svg_props) {
	return (
		<svg className={props.css} width={`${props.s || props.w}px` || "50px"} height={`${props.s || props.h}px` || "50px"} stroke={props.color || "black"} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
			<path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
			<path d="M3 12A9 3 0 0 0 21 12"></path>
		</svg>
	);
}
