import { CSSProperties } from "react";
import { addToCart } from "../actions/add_to_cart";

export default function AtcBtn({ css, product_id, available }: { css?: CSSProperties; product_id: number; available?: boolean }) {
	return (
		<form action={available ? addToCart : undefined} className="w-full">
			<input type="hidden" name="id" value={product_id} />
			<button type="submit" style={css} className={`z-10 bg_anim duration-100 w-full p-4 rounded-full text-xl font-black text-center  ${available && available ? "cursor-pointer shadow_anim" : "cursor-not-allowed brightness-75"}`}>
				Add to Cart
			</button>
		</form>
	);
}
