import { use } from "react";

import get_admin_data from "@/lib/get_admin_data";

import Header from "../components/header_admin";
import Sidebar from "./side";
import Provider from "../context/admin_provider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const data = use(get_data());

	if (!data) return <></>;
	return (
		<>
			<Provider data={data}>
				<Header />
				<section className="w-[90dvw] min-h-dvh pt-24 flex justify-center items-start translate-x-[5dvw] gap-16">
					<Sidebar />

					<main className="flex-1 p-8 overflow-y-auto">{children}</main>
				</section>
			</Provider>
		</>
	);
}

async function get_data() {
	const data = await get_admin_data();
	return JSON.parse(JSON.stringify(data));
}
