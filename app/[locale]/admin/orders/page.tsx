import Body from "./body";

export default function Home() {
	return (
		<div className="flex flex-col  w-full gap-8">
			<div className="flex flex-col gap-4">
				<h1 className="text-4xl font-bold">Orders</h1>
				<h1 className="text_shine">Recent Orders • Last sync: Just now</h1>
			</div>
			<Body />
		</div>
	);
}
