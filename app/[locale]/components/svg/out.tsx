import { svg_props } from "@/app/[locale]/types/svg_icon";

export default function Out(props: svg_props) {
	return (
		<svg className={props.css} width={`${props.s || props.w}px` || "50px"} height={`${props.s || props.h}px` || "50px"} fill="none" stroke={props.color || "black"} viewBox="0 0 24 24">
			<path d="m16 17 5-5-5-5"></path>
			<path d="M21 12H9"></path>
			<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>{" "}
		</svg>
	);
}
