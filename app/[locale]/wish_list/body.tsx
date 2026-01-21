"use client";
import { useContext, useState } from "react";
import Button from "../components/button";
import Server from "../components/svg/server";
import Trash from "../components/svg/trash";
import Wish from "../components/svg/wish";
import AtcBtn from "../components/addToCart";
import { domain, hostService } from "../types/product";
import user_data from "../context/user_data";

export default function Body() {
	const data = useContext(user_data) as { wish_list: (domain | hostService)[]; cart: (domain | hostService)[]; name: string } | undefined;
	const [items, set_items] = useState(data?.wish_list || []);

	return (
		<div className={`w-dvw min-h-dvh mt-16 px-32 py-16 flex justify-center ${items.length ? "items-start" : "items-center min-h-[50dvh!important]"} flex-col gap-8`}>
			{items.length ? (
				<>
					<h3 className="text-4xl font-black">Wish List</h3>
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
												<h6 className="text-xl font-bold">{e.type == "Domain" ? e.name : "Hosting Service"}</h6>
												<p className="text_shine">{e.type}</p>
											</div>
										</div>
										<div className="flex justify-between items-center gap-4 text-gray-500">
											<p className="font-bold text-xl text-foreground">${e.price}</p>
											<AtcBtn available={data?.cart.find((i) => e.id == i.id) ? false : true} css={{ color: "var(--foreground)" }} />
											<Button action={() => set_items(items.filter((s) => s.id != e.id))} content="" children_el={<Trash s={25} color="currentColor" css="hover:text-red-500 transition cursor-pointer" />} />
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</>
			) : (
				<>
					<Wish color="var(--foreground)" s={100} />
					<h1 className="text-5xl font-black">Your wish list is empty</h1>
					<Button content="Browse Services" url="/hosting" css="rounded-full bg_anim text-2xl px-8 font-black" />
				</>
			)}
		</div>
	);
}
