import Body from "./components/body";
import Header from "./components/header";

export default function Home() {
	return (
		<div className="flex flex-col overflow-hidden">
			<Header promotion={{ content: "Don't miss the Cyber week deals", expire_date: 1765289482959 }} />
			<Body />
		</div>
	);
}
