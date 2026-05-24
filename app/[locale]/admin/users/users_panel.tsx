"use client";
import { useContext, useRef, useState } from "react";
import { admin_data, OS } from "../../types/product";
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
		renew: boolean;
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
	renew: boolean;
	os?: OS;
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
	const [exp_date] = useState<Date>(new Date(s.expire));

	const [y, set_y] = useState<number>(exp_date.getFullYear());
	const [m, set_m] = useState<number>(exp_date.getMonth() + 1);
	const [d, set_d] = useState<number>(exp_date.getDate());
	const [role, set_role] = useState<"owner" | "admin">(s.role);

	const [renew, set_renew] = useState<boolean>(s.renew);

	const y_input = useRef<HTMLInputElement>(null);
	const m_input = useRef<HTMLInputElement>(null);
	const d_input = useRef<HTMLInputElement>(null);

	const [edit, set_edit] = useState<boolean>(false);

	const now = new Date();

	return (
		<div className="bg-(--clr-surface2) p-4 rounded-2xl w-full font-bold text-gray-400 flex flex-col justify-center items-start gap-2">
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
				<p>Operating System</p>
				<p>{s.os}</p>
			</div>
			<div className="w-full flex justify-between items-center px-4">
				<p>Price</p>
				<p>${s.price}</p>
			</div>
			{s.role == "owner" && (
				<div className="w-full flex justify-between items-center px-4">
					<p>Renew</p>
					{edit ? <Button css={renew ? "bg_green" : "bg_red"} content={renew ? "Enabled" : "Disabled"} action={() => set_renew(!renew)} /> : <p className={renew ? "text-green-400" : "text-red-400"}>{renew ? "Enabled" : "Disabled"}</p>}
				</div>
			)}
			<div className="w-full flex justify-between items-center px-4">
				<p>Role</p>
				{edit ? <Button content={role} css="bg_gray" styles={{ padding: "5px 20px" }} action={() => (role == "owner" ? set_role("admin") : set_role("owner"))} /> : <p>{role}</p>}
			</div>
			<div className="w-full flex justify-between items-center px-4">
				<p>Purchase Date</p>
				<p>{start_date.getFullYear() + "-" + (start_date.getMonth() + 1) + "-" + start_date.getDate()}</p>
			</div>
			<div className="w-full flex justify-between items-center px-4">
				<p>Ending Date</p>
				{edit ? (
					<div className="flex justify-center items-center gap-1">
						<input
							className="bg-(--clr-surface-light) transition rounded-[5px] border-2 border-gray-500/0 focus:border-gray-500 text-center outline-0 w-12 text-[16px]"
							type="text"
							value={y}
							onChange={(e) => {
								if (!y_input.current) return;
								e.preventDefault();
								const min_d = now.getDate();
								const min_m = now.getMonth() + 1;
								const min_y = now.getFullYear();
								const is_current_year = min_y == y;

								const newVal = Math.min(min_y + 20, Math.max(min_y, +y_input.current.value.replace(/\D/g, "")));
								set_y(newVal);

								const new_m = is_current_year && Math.max(min_m, m);

								if (new_m) {
									set_m(new_m);
									const is_current_month = min_m == new_m;
									if (is_current_month) set_d(Math.min(new_m % 2 ? 30 : 31, Math.max(min_d, d)));
								}
							}}
							ref={y_input}
							placeholder="yy"
						/>
						-
						<input
							className="bg-(--clr-surface-light) transition rounded-[5px] border-2 border-gray-500/0 focus:border-gray-500 text-center outline-0 w-8 text-[16px]"
							type="text"
							value={m}
							onChange={(e) => {
								if (!m_input.current) return;
								e.preventDefault();

								const min_d = now.getDate();
								const min_m = now.getMonth() + 1;
								const is_current_year = now.getFullYear() == y;

								const extractDigits = +m_input.current.value.replace(/\D/g, "");

								const newVal = Math.min(12, is_current_year ? Math.max(min_m, extractDigits) : extractDigits);
								set_m(newVal);

								const is_current_month = min_m == newVal;
								const new_d = is_current_year && is_current_month && Math.max(min_d, d);

								if (new_d) set_d(Math.min(newVal % 2 ? 30 : 31, new_d));
							}}
							ref={m_input}
							placeholder="mm"
						/>
						-
						<input
							className="bg-(--clr-surface-light) transition rounded-[5px] border-2 border-gray-500/0 focus:border-gray-500 text-center outline-0 w-8 text-[16px]"
							type="text"
							value={d}
							onChange={(e) => {
								if (!d_input.current) return;
								e.preventDefault();

								const extractDigits = +d_input.current.value.replace(/\D/g, "");

								const is_current_year = now.getFullYear() == y;
								const is_current_month = now.getMonth() + 1 == m;

								const newVal = is_current_year && is_current_month ? Math.max(now.getDate(), extractDigits) : extractDigits;
								set_d(Math.min(m % 2 ? 30 : 31, newVal));
							}}
							ref={d_input}
							placeholder="dd"
						/>
					</div>
				) : (
					<p>{exp_date.getFullYear() + "-" + (exp_date.getMonth() + 1) + "-" + exp_date.getDate()}</p>
				)}
			</div>
			<div className="w-full flex justify-between items-center px-4">
				<p>Time left</p>
				<p>{calcTime(now, exp_date)}</p>
			</div>
			{edit && (
				<div className="flex justify-center items-center gap-4">
					<Button
						content="Save"
						action={() => {
							set_edit(false);
							exp_date.setFullYear(y, m, d);

							fetch("/admin/updateUser/service", {
								method: "post",
								headers: { "Content-Type": "application/json" },
								body: JSON.stringify({
									id: s.id,
									exp_date,
									role: role,
									renew,
								}),
							});
						}}
					/>
					<Button
						content="Cancel"
						action={() => {
							set_edit(false);
							set_y(exp_date.getFullYear());
							set_m(exp_date.getMonth() + 1);
							set_d(exp_date.getDate());
							set_role(s.role);
							set_renew(s.renew);
						}}
					/>
				</div>
			)}
		</div>
	);
}

function calcTime(d1: Date, d2: Date): string {
	const p = (n: number, u: string) => `${n} ${u}${n !== 1 ? "s" : ""}`;
	const parts: string[] = [];

	const ms = [
		["year", 365.25 * 24 * 60 * 60 * 1e3],
		["month", 30.44 * 24 * 60 * 60 * 1e3],
		["day", 24 * 60 * 60 * 1e3],
		["hour", 60 * 60 * 1e3],
		["minute", 60 * 1e3],
		["second", 1e3],
	] as const;

	let dt = Math.abs(d1.getTime() - d2.getTime());

	for (const [unit, size] of ms) {
		if (dt >= size) {
			const n = Math.floor(dt / size);
			parts.push(p(n, unit));
			dt %= size;
		}
	}

	return parts.join(" ") || "0 seconds";
}
