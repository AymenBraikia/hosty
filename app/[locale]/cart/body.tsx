"use client";
import { useContext, useState } from "react";
import Button from "../components/button";
import Server from "../components/svg/server";
import Trash from "../components/svg/trash";
import Cart from "../components/svg/cart";
import user_data from "../context/user_data";
import { domain, hostService } from "../types/product";
import Notification from "../components/notification";

export default function Body() {
	const data = useContext(user_data) as { wish_list: (domain | hostService)[]; cart: (domain | hostService)[]; name: string } | undefined;
	const [items, set_items] = useState(data?.cart || []);
	const [err, set_err] = useState<string>("");
	const [notifciation_visibility, set_notifciation_visibility] = useState<boolean>(false);

	const subTotal = Number(items.reduce((sum, item) => sum + item.price * item.amount, 0).toFixed(2));
	const total = Number((subTotal * 1.1).toFixed(2));
	return (
		<div className={`w-dvw min-h-dvh mt-16 px-32 py-16 flex justify-center ${items.length ? "items-start" : "items-center min-h-[50dvh!important]"} flex-col gap-8`}>
			{items.length ? (
				<>
					<h3 className="text-4xl font-black">Shopping Cart</h3>
					<div className="flex justify-center items-start gap-8 w-full">
						<div className="flex justify-start items-start flex-col gap-8 w-full h-[75dvh] overflow-auto">
							{items.map((e) => {
								return (
									<div key={e.id} className="w-full p-4 flex justify-between items-center border border-(--clr-surface-light2) rounded-2xl">
										<div className="flex justify-start items-start gap-4">
											<div className="w-13 aspect-square bg-(--clr-surface) flex justify-center items-center rounded-2xl">
												<Server s={32} color="var(--clr-primary)" css="p-1" />
											</div>
											<div className="flex flex-col justify-center items-start">
												<h6 className="text-xl font-bold">{e.type == "Domain" ? e.name : "Hosting Service"}</h6>
												<p className="text_shine">{e.type}</p>
											</div>
										</div>
										<div className="flex justify-center items-center">
											<Button
												action={async () => {
													if (e.amount >= 99) {
														set_err("Quantity can't be more than 99");
														set_notifciation_visibility(true);
														return !notifciation_visibility && setTimeout(() => set_notifciation_visibility(false), 8e3);
													}
													const res = await updateAmount(e.id, e.amount + 1);

													if (res) {
														if (res.status == 200) set_items(items.map((p) => (p.id == e.id ? ((e.amount += 1), e) : p)));
														else {
															set_err((await res.json()).message);
															set_notifciation_visibility(true);
															return !notifciation_visibility && setTimeout(() => set_notifciation_visibility(false), 8e3);
														}
													} else {
														set_notifciation_visibility(true);
														set_err("There was an issue updating Quantity");
														return !notifciation_visibility && setTimeout(() => set_notifciation_visibility(false), 8e3);
													}
												}}
												content="+"
												css={`font-black text-xl [background:var(--clr-surface)] border border-(--clr-surface-light2) aspect-square w-10 h-10 flex justify-center items-center ${
													e.amount >= 99 ? "[cursor:not-allowed!important] brightness-75" : "cursor-pointer"
												}`}
											/>
											<div className="font-black text-xl aspect-square w-10 h-10 flex justify-center items-center">{e.amount}</div>
											<Button
												action={async () => {
													if (e.amount <= 1) {
														set_err("Quantity can't be less than 1");
														set_notifciation_visibility(true);
														return !notifciation_visibility && setTimeout(() => set_notifciation_visibility(false), 8e3);
													}
													const res = await updateAmount(e.id, e.amount - 1);

													if (res) {
														if (res.status == 200) set_items(items.map((p) => (p.id == e.id ? ((e.amount -= 1), e) : p)));
														else {
															set_err((await res.json()).message);
															set_notifciation_visibility(true);
															return !notifciation_visibility && setTimeout(() => set_notifciation_visibility(false), 8e3);
														}
													} else {
														set_notifciation_visibility(true);
														set_err("There was an issue updating Quantity");
														return !notifciation_visibility && setTimeout(() => set_notifciation_visibility(false), 8e3);
													}
												}}
												content="-"
												css={`font-black text-xl [background:var(--clr-surface)] border border-(--clr-surface-light2) aspect-square w-10 h-10 flex justify-center items-center ${
													e.amount <= 1 ? "[cursor:not-allowed!important] brightness-75" : "cursor-pointer"
												}`}
											/>
										</div>
										<div className="flex justify-between items-center gap-4 text-gray-500">
											<p className="font-bold text-xl text-foreground">${e.price}</p>
											{/* dont touch its trash btn */}
											<Button action={() => set_items(items.filter((s) => s.id != e.id))} content="" children_el={<Trash s={25} color="currentColor" css="hover:text-red-500 transition cursor-pointer" />} />
										</div>
									</div>
								);
							})}
						</div>
						<div className="p-8 bg-(--clr-surface) border border-(--clr-surface-light2) rounded-2xl flex flex-col justify-start items-start gap-8 min-w-1/3">
							<h4 className="text-3xl font-bold">Order Summary</h4>
							<div className="w-full justify-between items-center flex text-gray-400">
								<p>Subtotal</p>
								<p>${subTotal}</p>
							</div>
							<div className="w-full justify-between items-center flex text-gray-400">
								<p>Tax (10%)</p>
								<p>${(subTotal / 10).toFixed(2)}</p>
							</div>
							<hr className="w-full border-gray-700" />
							<div className="flex justify-between font-bold w-full">
								<p>Total</p>
								<p>${total}</p>
							</div>
							<Button content="Proceed to Checkout" css="bg_anim2 w-full" />
						</div>
					</div>
				</>
			) : (
				<>
					<Cart color="var(--foreground)" s={80} />
					<h1 className="text-5xl font-black">Your cart is empty</h1>
					<Button content="Browse Services" url="/hosting" css="rounded-full bg_anim text-2xl px-8 font-black" />
				</>
			)}
			<Notification err={err} notification_visible={notifciation_visibility} />
		</div>
	);
}

async function updateAmount(id: number, amount: number = 1) {
	if (amount > 99 || amount < 1) return;
	return await fetch("/api/cart_edit", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ id: id, amount: amount }),
	});
}
