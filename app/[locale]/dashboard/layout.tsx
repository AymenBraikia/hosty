import getUser from "@/lib/getUser";
import Header from "../components/header";
import Provider from "../context/user_data_provider";
import Sidebar from "./side";
import { use } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const data = use(getUser());

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
