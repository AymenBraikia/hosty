import { svg_props } from "@/app/[locale]/types/svg_icon";

export default function Dollar(props: svg_props) {
	return (
		<svg
			className={props.css}
			width={`${props.s || props.w}px` || "50px"}
			height={`${props.s || props.h}px` || "50px"}
			fill="none"
			stroke={props.color || "currentColor"}
			viewBox="0 0 24 24"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M18 8.5V8.35417C18 6.50171 16.4983 5 14.6458 5H9.5C7.567 5 6 6.567 6 8.5C6 10.433 7.567 12 9.5 12H14.5C16.433 12 18 13.567 18 15.5C18 17.433 16.433 19 14.5 19H9.42708C7.53436 19 6 17.4656 6 15.5729V15.5M12 3V21" />
		</svg>
	);
}
