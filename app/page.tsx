import Body from "./body";
import Footer from "./components/footer";
import Header from "./components/header";

export default function Home() {
	return (
		<div className="flex flex-col overflow-hidden">
			<Header promotion={{ content: "Don't miss the Cyber week deals", expire_date: 1765902320337 }} />
			<Body />
			<Footer />

		</div>
	);
}
