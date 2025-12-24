import { svg_props } from "@/app/types/svg_icon";

export default function Storage(props: svg_props) {
	return (
		<svg className={props.css} width={`${props.s || props.w}px` || "50px"} height={`${props.s || props.h}px` || "50px"} stroke={props.color || "black"} fill="none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>
			<rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>
			<line x1="6" x2="6.01" y1="6" y2="6"></line>
			<line x1="6" x2="6.01" y1="18" y2="18"></line>
		</svg>
	);
}
