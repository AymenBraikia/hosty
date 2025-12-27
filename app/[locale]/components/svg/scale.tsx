import { svg_props } from "@/app/[locale]/types/svg_icon";

export default function Scale(props: svg_props) {
	return (
		<svg className={props.css} width={`${props.s || props.w}px` || "50px"} height={`${props.s || props.h}px` || "50px"} fill="none" stroke={props.color || "black"} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<rect width="7" height="7" x="3" y="3" rx="1"></rect>
			<rect width="7" height="7" x="14" y="3" rx="1"></rect>
			<rect width="7" height="7" x="14" y="14" rx="1"></rect>
			<rect width="7" height="7" x="3" y="14" rx="1"></rect>
		</svg>
	);
}
