import Body from "./body";
import Footer from "../components/footer";
import Header from "../components/header";
import Provider from "../context/user_data_provider";
import getUser from "@/lib/getUser";
import { use } from "react";


export default function Home() {
	const data = use(getUser());
	return (
		<div className="flex flex-col overflow-hidden">
			<Provider data={data}>
				<Header />
			</Provider>
			<Body />
			<Footer />
		</div>
	);
}
