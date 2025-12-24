import { CSSProperties, useRef } from "react";

export default function AtcBtn(props?: { css?: CSSProperties }) {
	const btn = useRef<HTMLButtonElement>(null);
	return (
		<button
			ref={btn}
			onMouseDown={() => {
				if (btn.current) btn.current.style.scale = "0.9";
			}}
			onMouseUp={() => {
				if (btn.current) btn.current.style.scale = "1";
			}}
			onMouseLeave={() => {
				if (btn.current) btn.current.style.scale = "1";
			}}
			style={props?.css}
			className="z-10 bg_anim duration-100 w-full p-4 rounded-full text-xl font-black cursor-pointer text-center shadow_anim"
		>
			Add to Cart
		</button>
	);
}
