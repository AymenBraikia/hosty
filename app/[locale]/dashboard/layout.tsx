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
				<section className="lg:w-[90dvw] w-dvw min-h-dvh pt-24 flex justify-center items-start lg:translate-x-[5dvw] gap-16">
					<Sidebar />

					<main className="flex-1 sm:p-8 p-2 overflow-y-auto">{children}</main>
				</section>
			</Provider>
		</>
	);
}
