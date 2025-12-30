import Button from "../components/button";
import Server from "../components/svg/server";
import Trash from "../components/svg/trash";

const items = [
	{ type: "VPS Cloud", name: "VPS Standard", price: 12.99 },
	{ type: "VPS Cloud", name: "VPS Standard", price: 12.99 },
	{ type: "VPS Cloud", name: "VPS Standard", price: 12.99 },
	{ type: "VPS Cloud", name: "VPS Standard", price: 12.99 },
	{ type: "VPS Cloud", name: "VPS Standard", price: 12.99 },
	{ type: "VPS Cloud", name: "VPS Standard", price: 12.99 },
	{ type: "VPS Cloud", name: "VPS Standard", price: 12.99 },
	{ type: "VPS Cloud", name: "VPS Standard", price: 12.99 },
];

export default function Body() {
	return (
		<div className="w-dvw min-h-dvh mt-16 px-32 py-16 flex justify-center items-start flex-col gap-8">
			<h3 className="text-4xl font-black">Shopping Cart</h3>
			<div className="flex justify-center items-start gap-8 w-full">
				<div className="flex justify-start items-start flex-col gap-8 w-full h-[75dvh] overflow-auto">
					{items.map((e, k) => {
						return (
							<div key={k} className="w-full p-4 flex justify-between items-center border border-(--clr-surface-light2) rounded-2xl">
								<div className="flex justify-start items-start gap-4">
									<div className="w-13 aspect-square bg-(--clr-surface) flex justify-center items-center rounded-2xl">
										<Server s={32} color="var(--clr-primary)" css="p-1" />
									</div>
									<div className="flex flex-col justify-center items-start">
										<h6 className="text-xl font-bold">{e.name}</h6>
										<p className="text_shine">{e.type}</p>
									</div>
								</div>
								<div className="flex justify-between items-center gap-4 text-gray-500">
									<p className="font-bold text-xl text-foreground">${e.price}</p>
									{<Button content="" children_el={<Trash s={25} color="currentColor" css="hover:text-red-500 transition cursor-pointer" />} />}
								</div>
							</div>
						);
					})}
				</div>
				<div className="p-8 bg-(--clr-surface) border border-(--clr-surface-light2) rounded-2xl flex flex-col justify-start items-start gap-8 min-w-1/3">
					<h4 className="text-3xl font-bold">Order Summary</h4>
					<div className="w-full justify-between items-center flex text-gray-400">
						<p>Subtotal</p>
						<p>$12.99</p>
					</div>
					<div className="w-full justify-between items-center flex text-gray-400">
						<p>Tax (10%)</p>
						<p>$14.29</p>
					</div>
					<hr className="w-full border-gray-700" />
					<div className="flex justify-between font-bold w-full">
						<p>Total</p>
						<p>$14.29</p>
					</div>
					<Button content="Proceed to Checkout" css="bg_anim2 w-full" />
				</div>
			</div>
		</div>
	);
}
