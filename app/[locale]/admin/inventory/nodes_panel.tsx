"use client";

import { useContext, useRef, useState } from "react";
import { admin_data, hostService } from "../../types/product";
import admin_ctx from "../../context/admin_data";
import Button from "../../components/button";

export default function Nodes_panel() {
	const data = useContext(admin_ctx) as admin_data;

	const input_ref = useRef<HTMLInputElement>(null);
	// const [filter, set_filter] = useState<"CPU" | "RAM" | "Storage" | "Bandwidth" | "Price">("Price");
	// const [[sort_cpu, set_sort_cpu], [sort_ram, set_sort_ram], [sort_storage, set_sort_storage], [sort_band, set_sort_band], [sort_price, set_sort_price]] = [
	// 	useState<boolean>(false),
	// 	useState<boolean>(false),
	// 	useState<boolean>(false),
	// 	useState<boolean>(false),
	// 	useState<boolean>(false),
	// ];
	// const [nodes, set_nodes] = useState<hostService[]>(sortNodes(data.inventory, filter, sort_price));
	const [nodes, set_nodes] = useState<hostService[]>(data.inventory);

	// useEffect(() => {
	// 	const timer = setTimeout(() => {
	// 		let m = false;
	// 		switch (filter) {
	// 			case "CPU":
	// 				m = sort_cpu;
	// 				break;
	// 			case "RAM":
	// 				m = sort_ram;
	// 				break;
	// 			case "Storage":
	// 				m = sort_storage;
	// 				break;
	// 			case "Bandwidth":
	// 				m = sort_band;
	// 				break;
	// 			case "Price":
	// 				m = sort_price;
	// 				break;
	// 		}
	// 		console.log(m);
	// 		set_nodes(sortNodes(nodes, filter, m));
	// 	}, 0);
	// 	// return clearTimeout(timer);
	// }, [filter, nodes, sort_band, sort_cpu, sort_price, sort_ram, sort_storage]);

	function handle_input() {
		if (!input_ref.current) return;
		const val = input_ref.current.value;
		if (!val) return set_nodes(data.inventory);
		set_nodes(data.inventory.filter((n) => n.type.toLowerCase().includes(val.toLowerCase()) || n.id == +val));
	}

	return (
		<div className="w-full flex flex-col justify-center items-start rounded-2xl overflow-hidden bg-(--clr-surface)">
			<div className="w-full p-4">
				<input className="outline-0 w-full text-[16px]" ref={input_ref} onInput={handle_input} type="text" placeholder="Search by id or type..." />
			</div>
			<div className="w-full">
				<div className="w-full flex justify-between items-center text-gray-400 bg-(--clr-surface2) border border-(--clr-surface-light2) font-bold p-4">
					<p className="w-1/8 text-center">Service SKU</p>
					<p className="w-5 text-center">ID</p>
					<div className="flex justify-center items-center gap-1 w-4/8">
						<Button
							css="w-full text-center"
							content="CPU"
							// action={() => {
							// 	if (filter == "CPU") set_sort_cpu(!sort_cpu);
							// 	set_filter("CPU");
							// }}
						/>
						<Button
							css="w-full text-center"
							content="RAM"
							// action={() => {
							// 	if (filter == "RAM") set_sort_ram(!sort_ram);
							// 	set_filter("RAM");
							// }}
						/>
						<Button
							css="w-full text-center"
							content="Storage"
							// action={() => {
							// 	if (filter == "Storage") set_sort_storage(!sort_storage);
							// 	set_filter("Storage");
							// }}
						/>
						<Button
							css="w-full text-center"
							content="Bandwidth"
							// action={() => {
							// 	if (filter == "Bandwidth") set_sort_band(!sort_band);
							// 	set_filter("Bandwidth");
							// }}
						/>
						<Button
							css="w-full text-center"
							content="Price/Mo"
							// action={() => {
							// 	if (filter == "Price") set_sort_price(!sort_price);
							// 	set_filter("Price");
							// }}
						/>
					</div>
					<p className="w-1/16 text-center">Visibility</p>
					<p className="w-1/6 text-center">Actions</p>
				</div>
				{nodes.map((n) => (
					<div key={n.id} className={`w-full flex justify-between items-center text-gray-400 border border-(--clr-surface-light2) hover:bg-(--clr-surface-light2) p-4 transition`}>
						<p className="z-10 w-1/8 text-center font-bold">{n.type}</p>
						<p className="z-10 w-5 text-center font-bold">{n.id}</p>
						<div className="flex justify-center items-center gap-1 w-4/8">
							<p className="z-10 w-full text-center p-1 bg-(--clr-surface-light) border-2 border-(--clr-surface-light2) rounded-xl mx-0.5 font-bold text-nowrap">{n.specs?.cpu} VCPU</p>
							<p className="z-10 w-full text-center p-1 bg-(--clr-surface-light) border-2 border-(--clr-surface-light2) rounded-xl mx-0.5 font-bold text-nowrap">{n.specs?.ram}GB RAM</p>
							<p className="z-10 w-full text-center p-1 bg-(--clr-surface-light) border-2 border-(--clr-surface-light2) rounded-xl mx-0.5 font-bold text-nowrap">{n.specs?.storage}</p>
							<p className="z-10 w-full text-center p-1 bg-(--clr-surface-light) border-2 border-(--clr-surface-light2) rounded-xl mx-0.5 font-bold text-nowrap">{n.specs?.bandwidth}</p>
							<p className="z-10 w-full text-center font-bold">${n.price}</p>
						</div>
						<p className={`z-10 text-center font-bold rounded-xl px-4 py-2 w-fit ${n.active ? "text-green-400 bg-green-400/20" : "text-gray-400 bg-gray-400/20"}`}>{n.active ? "Live" : "Hidden"}</p>
						<div className="z-10 flex justify-center items-center gap-4 w-1/6 text-center">
							<Button content="Edit" css=" hover:bg-(--clr-surface) transition" />
							<Button content="Delete" css=" danger transition" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

// function sortNodes(nodes: hostService[], filter: "CPU" | "RAM" | "Storage" | "Bandwidth" | "Price", smallToLarge: boolean) {
// 	let newArr: hostService[] = [...nodes];
// 	switch (filter) {
// 		case "CPU":
// 			newArr = nodes.sort((a, b) => {
// 				return smallToLarge ? a.specs!.cpu - b.specs!.cpu : b.specs!.cpu - a.specs!.cpu;
// 			});
// 			break;
// 		case "RAM":
// 			newArr = nodes.sort((a, b) => (smallToLarge ? a.specs!.ram - b.specs!.ram : b.specs!.ram - a.specs!.ram));
// 			break;
// 		case "Storage":
// 			newArr = nodes.sort((a, b) => {
// 				const n1 = Number(a.specs!.storage.match(/\d+/)?.[0]);
// 				const n2 = Number(b.specs!.storage.match(/\d+/)?.[0]);
// 				return smallToLarge ? n1 - n2 : n2 - n1;
// 			});
// 			break;
// 		case "Bandwidth":
// 			newArr = nodes.sort((a, b) => {
// 				const n1 = Number(a.specs!.storage.match(/\d+/)?.[0]);
// 				const n2 = Number(b.specs!.storage.match(/\d+/)?.[0]);
// 				return smallToLarge ? n1 - n2 : n2 - n1;
// 			});
// 			break;
// 		case "Price":
// 			newArr = nodes.sort((a, b) => (smallToLarge ? a.price - b.price : b.price - a.price));
// 			break;
// 		default:
// 			return nodes;
// 	}
// 	return newArr;
// }
