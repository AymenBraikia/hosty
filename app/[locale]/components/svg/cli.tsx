import { svg_props } from "@/app/[locale]/types/svg_icon";

export default function Cli(props: svg_props) {
	return (
		<svg className={props.css} width={`${props.s || props.w}px` || "50px"} height={`${props.s || props.h}px` || "50px"} fill="none" stroke={props.color || "black"} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M12 19h8"></path>
			<path d="m4 17 6-6-6-6"></path>
		</svg>
	);
}
