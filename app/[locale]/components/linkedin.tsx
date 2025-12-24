import { svg_props } from "@/app/types/svg_icon";

export default function Linkedin(props: svg_props) {
	return (
		<svg className={props.css} width={`${props.s || props.w}px` || "50px"} height={`${props.s || props.h}px` || "50px"} stroke={props.color || "black"} fill="none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
			<rect width="4" height="12" x="2" y="9"></rect>
			<circle cx="4" cy="4" r="2"></circle>
		</svg>
	);
}
