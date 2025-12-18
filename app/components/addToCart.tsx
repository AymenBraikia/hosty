import { CSSProperties } from "react";

export default function AtcBtn(props?: { css?: CSSProperties }) {
	return (
		<button style={props?.css} className="z-10 bg_anim w-full p-4 rounded-full text-xl font-black cursor-pointer text-center shadow_anim">
			Add to Cart
		</button>
	);
}
