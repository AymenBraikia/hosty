import { CSSProperties, useRef, useState } from "react";

export default function AtcBtn(props?: { css?: CSSProperties; product_id?: number; available?: boolean }) {
	const btn = useRef<HTMLButtonElement>(null);

	const [fetching, set_fetching] = useState<boolean>(false);

	return (
		<button
			ref={btn}
			onMouseDown={() => {
				if (!props?.available) return;
				if (btn.current) btn.current.style.scale = "0.9";
			}}
			onMouseUp={async () => {
				if (!props?.available) return;

				set_fetching(true);
				if (btn.current) btn.current.style.scale = "1";
				if (!props?.product_id) return;

				const res = await atc(props.product_id);
				set_fetching(false);
			}}
			onMouseLeave={() => {
				if (!props?.available) return;
				if (btn.current) btn.current.style.scale = "1";
			}}
			style={props?.css}
			className={`z-10 bg_anim duration-100 w-full p-4 rounded-full text-xl font-black text-center  ${props?.available ? "cursor-pointer shadow_anim" : "cursor-not-allowed brightness-75"}`}
		>
			Add to Cart
		</button>
	);
}

async function atc(id: number) {
	return await (
		await fetch("/cart_add", {
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id: id }),
			method: "post",
		})
	).json();
}
