import Body from "./body";
import Header from "../components/header";

export default function Home() {
	return (
		<div className="flex flex-col overflow-hidden">
			<Header />
			<Body />
		</div>
	);
}
