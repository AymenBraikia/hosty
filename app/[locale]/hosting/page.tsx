import Body from "./body";
import Footer from "../components/footer";
import Header from "../components/header";
import Provider from "../context/user_data_provider";
import getUser from "@/lib/getUser";
import { use } from "react";
import get_all_services from "@/lib/get_all_services";

export default function Home() {
	const data = use(getUser());
	const services = use(get_all_services()).map((s) => ({
		type: s.type,
		cpu: s.specs!.cpu,
		ram: s.specs!.ram,
		bandwidth: s.specs!.bandwidth,
		storage: s.specs!.storage,
		id: s.id,
		price: s.price,
		title: s.badge,
		mostPopular: s.most_popular,
		discount: s.discount,
	}));

	return (
		<div className="flex flex-col overflow-hidden">
			<Provider data={data}>
				<Header />
			</Provider>
			<Body services={services} />
			<Footer />
		</div>
	);
}
