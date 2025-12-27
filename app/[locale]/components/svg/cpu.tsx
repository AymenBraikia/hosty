import { svg_props } from "@/app/[locale]/types/svg_icon";

export default function Cpu(props: svg_props) {
	return (
		<svg className={props.css} width={`${props.s || props.w}px` || "50px"} height={`${props.s || props.h}px` || "50px"} stroke={props.color || "black"} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M12 20v2"></path>
			<path d="M12 2v2"></path>
			<path d="M17 20v2"></path>
			<path d="M17 2v2"></path>
			<path d="M2 12h2"></path>
			<path d="M2 17h2"></path>
			<path d="M2 7h2"></path>
			<path d="M20 12h2"></path>
			<path d="M20 17h2"></path>
			<path d="M20 7h2"></path>
			<path d="M7 20v2"></path>
			<path d="M7 2v2"></path>
			<rect x="4" y="4" width="16" height="16" rx="2"></rect>
			<rect x="8" y="8" width="8" height="8" rx="1"></rect>
		</svg>
	);
}
