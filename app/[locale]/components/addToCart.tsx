import { CSSProperties, Dispatch, SetStateAction, useRef, useState } from "react";

export default function AtcBtn(props?: { css?: CSSProperties; product_id?: number; available?: boolean; notification_State?: Dispatch<SetStateAction<boolean>>; notification_Err?: Dispatch<SetStateAction<string>> }) {
	const btn = useRef<HTMLButtonElement>(null);

	const [fetching, set_fetching] = useState<boolean>(false);
	const [availability, set_availability] = useState<boolean>(false);

	return (
		<button
			ref={btn}
			onMouseDown={() => {
				if (!props?.available) return;
				if (btn.current) btn.current.style.scale = "0.9";
			}}
			onMouseUp={async () => {
				if (!props) return;
				// if (!props?.available) return;

				set_fetching(true);
				if (btn.current) btn.current.style.scale = "1";

				if (typeof props.product_id != "number") return;

				const res = await atc(props.product_id);

				if (res.status == 200) {
					set_availability(false);
				} else if (props.notification_Err && props.notification_State) {
					set_availability(true);
					props.notification_State(true);

					setTimeout(() => props.notification_State!(false), 8000);

					props.notification_Err((await res.json()).message || "There was an error while adding this item to cart");
				}

				set_fetching(false);
			}}
			onMouseLeave={() => {
				if (!props?.available) return;
				if (btn.current) btn.current.style.scale = "1";
			}}
			style={props?.css}
			className={`z-10 bg_anim duration-100 w-full p-4 rounded-full text-xl font-black text-center  ${availability && (props?.available || fetching) ? "cursor-pointer shadow_anim" : "cursor-not-allowed brightness-75"}`}
		>
			Add to Cart
		</button>
	);
}

async function atc(id: number) {
	return await fetch("/api/cart_add", {
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ id: id }),
		method: "post",
	});
}
