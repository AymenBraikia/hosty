"use client";
import Button from "../components/button";
import Paypal from "./paypal";

export default function Body() {
	return (
		<div className="flex flex-col justify-start items-start gap-6 w-[70dvw] top-20 relative left-1/2 -translate-x-1/2">
			<Button type="back" />
			<h1 className="font-bold text-5xl">Checkout</h1>
			<h3 className="text-3xl font-bold">This is Sandbox mode:</h3>
			<div className="text-xl flex justify-center items-center gap-4 cursor-pointer" onClick={() => navigator.clipboard.writeText("test@hosty.com")}>
				<p className="font-bold">Test email:</p>
				<p className="text-(--clr-accent)">test@hosty.com</p>
			</div>
			<div className="text-xl flex justify-center items-center gap-4 cursor-pointer" onClick={() => navigator.clipboard.writeText("Hosty_123")}>
				<p className="font-bold">Test password:</p>
				<p className="text-(--clr-accent)">Hosty_123</p>
			</div>
			<Paypal />
		</div>
	);
}
