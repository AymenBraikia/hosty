import Body from "./body";
import Header from "../components/header";
import getUser from "@/lib/getUser";
import { use } from "react";
import Provider from "../context/user_data_provider";

export default function Home() {
	const data = use(getUser());
	return (
		<div className="flex flex-col overflow-hidden">
			<Provider data={data}>
				<Header />
			</Provider>
			<Body />
		</div>
	);
}
