import Stats from "./components/stats";

export default function Home() {
	return (
		<div className="flex flex-col  w-full gap-8">
			<div className="flex flex-col gap-4">
				<h1 className="text-4xl font-bold">Analytics</h1>
				<h1 className="text_shine">Monthly Stats • Last sync: Just now</h1>
			</div>
			<Stats />
		</div>
	);
}
