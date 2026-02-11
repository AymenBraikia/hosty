import { svg_props } from "@/app/[locale]/types/svg_icon";

export default function Turnoff(props: svg_props) {
	return (
		<svg className={props.css} width={`${props.s || props.w}px` || "50px"} height={`${props.s || props.h}px` || "50px"} fill="none" stroke={props.color || "currentColor"} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M12 1v10"></path>
			<path d="M18.4 6.6a9 9 0 1 1-12.77.04"></path>
		</svg>
	);
}
