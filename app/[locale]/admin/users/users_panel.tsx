"use client";
import { useContext, useRef, useState } from "react";
import { admin_data } from "../../types/product";
import admin_ctx from "../../context/admin_data";
import Button from "../../components/button";
interface user {
	full_name: string;
	email: string;
	verified: boolean;
	admin: boolean;
	active_subscription: {
		id: number;
		price: number;
		type: "Domain" | "Cloud VDS" | "Cloud VPS" | "Dedicated Server";
		started: string | Date;
		expire: string | Date;
		role: "admin" | "owner";
	}[];
	total_spent: number;
}
interface sub {
	id: number;
	price: number;
	type: "Domain" | "Cloud VDS" | "Cloud VPS" | "Dedicated Server";
	started: string | Date;
	expire: string | Date;
	role: "admin" | "owner";
}

export default function Users_panel() {
	const data = useContext(admin_ctx) as admin_data;
	const dark_bg = useRef<HTMLDivElement>(null);

	const [users, set_users] = useState<user[]>(data.users);
	const [sub_view, set_sub_view] = useState<{ subs: sub[]; username: string } | null>(null);

	const input_ref = useRef<HTMLInputElement>(null);

	function handle_input() {
		if (!input_ref.current) return;
		const val = input_ref.current.value;
		if (!val) return set_users(data.users);
		set_users(data.users.filter((n) => n.full_name.toLowerCase().includes(val.toLowerCase()) || n.email.toLowerCase().includes(val.toLowerCase())));
	}

	return (
		<div className="w-full flex flex-col justify-center items-start rounded-2xl overflow-hidden bg-(--clr-surface)">
			<div className="w-full p-4">
				<input className="outline-0 w-full text-[16px]" ref={input_ref} onInput={handle_input} type="text" placeholder="Search by name or email..." />
			</div>
			<div className="w-full">
				<div className="w-full flex justify-between items-center text-gray-400 bg-(--clr-surface2) border border-(--clr-surface-light2) font-bold p-4">
					<div className="flex justify-center items-center gap-1 w-full">
						<p className="w-full max-w-[150px] text-center">User name</p>
						<p className="w-full max-w-1/4 text-center">Email</p>
						<p className="w-[120px] text-center">Status</p>
						<p className="w-[100px] text-center">Type</p>
						<p className="w-[100px] text-center">Spendings</p>
						<p className="w-full max-w-[100px] text-center">Services</p>
						<p className="w-full max-w-[100px] text-center">Actions</p>
					</div>
				</div>
				{users.map((u) => (
					<div key={u.full_name} className={`w-full flex justify-between items-center text-gray-400 border border-(--clr-surface-light2) hover:bg-(--clr-surface-light2) p-4 transition`}>
						<div className="flex justify-center items-center gap-1 w-full">
							<p className="w-full max-w-[150px] text-[14px] text-center font-bold">{u.full_name}</p>
							<p className="w-full max-w-1/4 text-center text-[14px]">{u.email}</p>
							<p className={`text-center p-2 rounded-xl cursor-pointer w-[120px] font-bold ${u.verified ? "text-green-400 bg-green-400/20" : "text-yellow-400 bg-yellow-400/20"}`}>{u.verified ? "Verified" : "Not verified"}</p>
							<button onClick={() => {}} className={`w-[100px] text-center font-bold p-2 rounded-xl cursor-pointer ${u.admin ? "text-green-400 bg-green-400/20" : "text-orange-400 bg-orange-400/20"}`}>
								{u.admin ? "Admin" : "User"}
							</button>
							<p className="w-[100px] text-center font-bold">${u.total_spent}</p>
							<div className="w-full max-w-[100px] text-center">
								{u.active_subscription.length ? <Button action={() => set_sub_view({ subs: u.active_subscription, username: u.full_name })} content={`View (${u.active_subscription.length})`} /> : "None"}
							</div>
							<Button content="Suspend" css="danger w-full max-w-[100px]" />
						</div>
					</div>
				))}
			</div>
			{sub_view && (
				<div ref={dark_bg} className="fixed w-dvw h-dvh left-1/2 top-1/2 -translate-1/2 bg-black/75 z-50 flex justify-center items-center" onClick={(e) => e.target == dark_bg.current && set_sub_view(null)}>
					<Button content="Close" css="absolute right-4 top-1/8 bg_gray" action={() => set_sub_view(null)} />
					<div className="min-w-[800px] p-4 rounded-2xl bg-(--clr-surface) border-2 border-(--clr-surface-light2) flex justify-center items-center flex-col gap-4">
						<h1 className="text-2xl font-bold text_shine w-full text-center">{sub_view.username}&apos;s services</h1>
						<div className="flex justify-start items-center flex-col gap-4 w-full max-h-[60dvh] overflow-x-hidden overflow-y-auto">
							{sub_view.subs.map((s) => {
								return <Service key={s.id + s.expire.toString()} s={s} />;
							})}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

function Service({ s }: { s: sub }) {
	const start_date = new Date(s.started);
	const exp_date = new Date(s.expire);

	const [edit, set_edit] = useState<boolean>(false);

	return (
		<div className="bg-(--clr-surface2) p-4 rounded-2xl w-full font-bold text-gray-400">
			<Button content="Edit" action={() => set_edit(true)} />
			<div className="w-full flex justify-between items-center px-4">
				<p>ID</p>
				<p>{s.id}</p>
			</div>
			<div className="w-full flex justify-between items-center px-4">
				<p>Type</p>
				<p>{s.type}</p>
			</div>
			<div className="w-full flex justify-between items-center px-4">
				<p>Price</p>
				<p>${s.price}</p>
			</div>
			<div className="w-full flex justify-between items-center px-4">
				<p>Role</p>
				<p>{s.role}</p>
			</div>
			<div className="w-full flex justify-between items-center px-4">
				<p>Purchase Date</p>
				<p>{start_date.getFullYear() + "-" + start_date.getMonth() + "-" + start_date.getDay()}</p>
			</div>
			<div className="w-full flex justify-between items-center px-4">
				<p>Ending Date</p>
				<p>{exp_date.getFullYear() + "-" + exp_date.getMonth() + "-" + exp_date.getDay()}</p>
			</div>
			<div className="w-full flex justify-between items-center px-4">
				<p>Time left</p>
				<p>{calcTime(start_date, exp_date)}</p>
			</div>
			{edit && (
				<Button
					content="Save"
					action={() => {
						set_edit(false);
					}}
				/>
			)}
		</div>
	);
}

function calcTime(d1: Date, d2: Date): string {
	let results = "";

	const year_in_ms = 365 * 24 * 60 * 60 * 1e3;
	const month_in_ms = 30 * 24 * 60 * 60 * 1e3;
	const day_in_ms = 24 * 60 * 60 * 1e3;
	const hour_in_ms = 60 * 60 * 1e3;
	const min_in_ms = 60 * 1e3;

	let dt = Math.abs(d1.getTime() - d2.getTime());
	if (dt >= year_in_ms) {
		results += Math.floor(dt / year_in_ms) + " year ";
		dt %= year_in_ms;
	}
	if (dt >= month_in_ms) {
		results += Math.floor(dt / month_in_ms) + " month ";
		dt %= month_in_ms;
	}
	if (dt >= day_in_ms) {
		results += Math.floor(dt / day_in_ms) + " days ";
		dt %= day_in_ms;
	}
	if (dt >= hour_in_ms) {
		results += Math.floor(dt / hour_in_ms) + " hour ";
		dt %= hour_in_ms;
	}
	if (dt >= min_in_ms) {
		results += Math.floor(dt / min_in_ms) + " min ";
		dt %= min_in_ms;
	}
	if (dt >= 1e3) {
		results += Math.floor(dt / 1e3) + " second";
		dt %= 1e3;
	}

	return results;
}
