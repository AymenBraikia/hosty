import Body from "./body";
import Footer from "../components/footer";
import Header from "../components/header";
import getUser from "@/lib/getUser";
import Provider from "../context/user_data_provider";
interface prop {
	searchParams: Promise<{ id?: string }>;
}

export default async function Home({ searchParams }: prop) {
	const data = await getUser();
	const { id } = await searchParams;

	return (
		<div className="flex flex-col overflow-hidden">
			<Provider data={data}>
				<Header />
				<Body id={id ? +id : 1} />
			</Provider>
			<Footer />
		</div>
	);
}
