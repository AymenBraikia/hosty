import Button from "../components/button";
import Paypal from "./paypal";

export default function Body() {
	return (
		<div className="flex flex-col justify-start items-start w-[70dvw] top-20 relative left-1/2 -translate-x-1/2">
			<Button type="back" />
			<h1 className="font-bold text-5xl">Checkout</h1>
			<Paypal />
		</div>
	);
}
