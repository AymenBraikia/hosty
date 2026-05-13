"use client";
import { useContext, useState } from "react";
import { admin_data } from "../../types/product";
import admin_ctx from "../../context/admin_data";
import Users_panel from "./users_panel";

export default function Body() {
	const data = useContext(admin_ctx) as admin_data;
	const [users, set_users] = useState<unknown[]>(data.users);
	return (
		<div className="flex flex-col gap-8 overflow-hidden">
			<div>
				<h1 className="text-4xl font-bold">Users</h1>
				<p className="text_shine">Manage All Users</p>
			</div>

			<Users_panel />
		</div>
	);
}
