import { use } from "react";
import Body from "./body";
import Footer from "./components/footer";
import Header from "./components/header";
import getUser from "@/lib/getUser";
import Provider from "./context/user_data_provider";

export default function Home() {
	const data = use(getUser());

	return (
		<div className="flex flex-col overflow-hidden">
			<Provider data={data}>
				<Header promotion={{ content: "Don't miss the Cyber week deals", expire_date: 1767364412613 }} />
			</Provider>
			<Body />

			<Footer />
		</div>
	);
}
