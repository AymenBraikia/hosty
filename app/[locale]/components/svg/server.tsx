import { svg_props } from "@/app/[locale]/types/svg_icon";

export default function Server(props: svg_props) {
	return (
		<svg className={props.css} width={`${props.s || props.w}px` || "50px"} height={`${props.s || props.h}px` || "50px"} fill="none" stroke={props.color || "black"} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<rect width={(props.s && props.s * 0.625) || (props.w && props.w * 0.625) || 50 * 0.625} height={(props.s && props.s * 0.25) || (props.w && props.w * 0.25) || 50 * 0.25} x="2" y="2" rx="2" ry="2"></rect>
			<rect width={(props.s && props.s * 0.625) || (props.w && props.w * 0.625) || 50 * 0.625} height={(props.s && props.s * 0.25) || (props.w && props.w * 0.25) || 50 * 0.25} x="2" y="14" rx="2" ry="2"></rect>
			<line x1="6" x2="6.01" y1="6" y2="6"></line>
			<line x1="6" x2="6.01" y1="18" y2="18"></line>
		</svg>
	);
}
