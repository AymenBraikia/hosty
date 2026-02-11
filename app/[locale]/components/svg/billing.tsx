import { svg_props } from "@/app/[locale]/types/svg_icon";

export default function Billing(props: svg_props) {
	return (
		<svg className={props.css} width={`${props.s || props.w}px` || "50px"} height={`${props.s || props.h}px` || "50px"} fill="none" stroke={props.color || "currentColor"} viewBox="0 0 24 24">
			<rect width="20" height="14" x="2" y="5" rx="2"></rect>
			<line x1="2" x2="22" y1="10" y2="10"></line>
		</svg>
	);
}
