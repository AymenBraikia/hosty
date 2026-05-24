import { CSSProperties } from "react";
import { addToWish } from "../actions/add_to_wish";

export default function AtwBtn({ css, product_id, available }: { css?: CSSProperties; product_id: number; available?: boolean }) {
	return (
		<form action={available ? addToWish : undefined} className="w-full">
			<input type="hidden" name="id" value={product_id} />
			<button type="submit" style={css} className={`z-10 bg_anim duration-100 w-full p-4 rounded-full text-xl font-black text-center  ${available && available ? "cursor-pointer shadow_anim" : "cursor-not-allowed brightness-75"}`}>
				Add to Wish list
			</button>
		</form>
	);
}
