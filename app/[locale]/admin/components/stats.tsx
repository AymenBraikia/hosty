"use client";

import { useContext } from "react";
import admin_ctx from "../../context/admin_data";
import { admin_data } from "../../types/product";
import Col_chart from "./col_chart";
import Dollar from "../../components/svg/dollar";
import Server from "../../components/svg/server";
import Pulse from "../../components/svg/pulse";
import Thunder from "../../components/svg/thunder";
import Star from "../../components/svg/star";
import LineChart from "./chart";
import CircleChart from "./circle_chart";
const cols: [number, string][] = [
	[Math.floor(Math.random() * 1e6), "Jan"],
	[Math.floor(Math.random() * 1e6), "Feb"],
	[Math.floor(Math.random() * 1e6), "Mar"],
	[Math.floor(Math.random() * 1e6), "Apr"],
	[Math.floor(Math.random() * 1e6), "May"],
	[Math.floor(Math.random() * 1e6), "Jun"],
	[Math.floor(Math.random() * 1e6), "Jul"],
	[Math.floor(Math.random() * 1e6), "Aug"],
	[Math.floor(Math.random() * 1e6), "Sep"],
	[Math.floor(Math.random() * 1e6), "Oct"],
	[Math.floor(Math.random() * 1e6), "Nov"],
	[Math.floor(Math.random() * 1e6), "Dec"],
];

export default function Stats() {
	const data = useContext(admin_ctx) as admin_data;
	const revenue_delta = (data.revenue - data.last_revenue).toFixed(2);
	const uptime_delta = (data.uptime - data.last_uptime).toFixed(2);
	const active_nodes_delta = (data.nodes - data.last_active_nodes).toFixed(2);
	const rating_delta = (data.rating - data.last_rating).toFixed(1);
	const spendings_delta = (data.spendings - data.last_spendings).toFixed(2);
	const system_load_delta = (data.system_load - data.last_system_last_load).toFixed(2);

	return (
		<>
			<div className="flex justify-center items-center gap-4 w-full flex-wrap">
				<Card>
					<div className="w-full h-full flex justify-between items-start flex-col p-8 relative">
						<div className="w-full flex justify-between items-center ">
							<h2 className="text-2xl font-bold">Revenue</h2>
							<p className={`${+revenue_delta < 0 ? "text-red-300" : "text-green-300"} font-bold`}>
								{+revenue_delta < 0 && "+"}
								{revenue_delta}$
							</p>
						</div>
						<div className="w-full flex justify-between items-center ">
							<h1 className="text-3xl font-bold">${data.revenue}</h1>
							<div className="flex justify-center items-center bg-green-400/10 text-green-400/80 p-2 rounded-2xl">
								<Dollar css="" s={30} />
							</div>
						</div>
					</div>
				</Card>
				<Card>
					<div className="w-full h-full flex justify-between items-start flex-col p-8">
						<div className="w-full flex justify-between items-center">
							<h2 className="text-2xl font-bold">Spendings</h2>
							<p className={`${+spendings_delta > 0 ? "text-red-300" : "text-green-300"} font-bold`}>
								{+spendings_delta > 0 && "+"}
								{spendings_delta}$
							</p>
						</div>
						<div className="w-full flex justify-between items-center ">
							<h1 className="text-3xl font-bold">{data.spendings}$</h1>
							<div className="flex justify-center items-center bg-blue-400/10 text-blue-400/80 p-2 rounded-2xl">
								<Dollar css="" s={30} />
							</div>
						</div>
					</div>
				</Card>
				<Card>
					<div className="w-full h-full flex justify-between items-start flex-col p-8">
						<div className="w-full flex justify-between items-center">
							<h2 className="text-2xl font-bold">Active Nodes</h2>
							<p className={`${+active_nodes_delta < 0 ? "text-red-300" : "text-green-300"} font-bold`}>
								{+active_nodes_delta < 0 && "+"}
								{active_nodes_delta}
							</p>
						</div>
						<div className="w-full flex justify-between items-center ">
							<h1 className="text-3xl font-bold">{data.nodes}</h1>
							<div className="flex justify-center items-center bg-purple-400/20 text-purple-500/80 p-2.5 rounded-2xl">
								<Server css="" s={24} />
							</div>
						</div>
					</div>
				</Card>
				<Card>
					<div className="w-full h-full flex justify-between items-start flex-col p-8">
						<div className="w-full flex justify-between items-center">
							<h2 className="text-2xl font-bold">Up Time</h2>
							<p className={`${+uptime_delta < 0 ? "text-red-300" : "text-green-300"} font-bold`}>
								{+uptime_delta > 0 && "+"}
								{uptime_delta}%
							</p>
						</div>
						<div className="w-full flex justify-between items-center ">
							<h1 className="text-3xl font-bold">{data.uptime}%</h1>
							<div className="flex justify-center items-center bg-red-400/10 text-red-400/80 p-2 rounded-2xl">
								<Pulse css="" s={30} />
							</div>
						</div>
					</div>
				</Card>
				<Card>
					<div className="w-full h-full flex justify-between items-start flex-col p-8">
						<div className="w-full flex justify-between items-center">
							<h2 className="text-2xl font-bold">System Load</h2>
							<p className={`${+system_load_delta < 0 ? "text-red-300" : "text-green-300"} font-bold`}>
								{+system_load_delta > 0 && "+"}
								{system_load_delta}%
							</p>
						</div>
						<div className="w-full flex justify-between items-center ">
							<h1 className="text-3xl font-bold">{data.system_load}%</h1>
							<div className="flex justify-center items-center bg-orange-400/10 text-orange-400/80 p-2 rounded-2xl">
								<Thunder css="" s={30} />
							</div>
						</div>
					</div>
				</Card>
				<Card>
					<div className="w-full h-full flex justify-between items-start flex-col p-8">
						<div className="w-full flex justify-between items-center">
							<h2 className="text-2xl font-bold">Rating</h2>
							<p className={`${+rating_delta < 0 ? "text-red-300" : "text-green-300"} font-bold`}>
								{+rating_delta > 0 && "+"}
								{rating_delta}
							</p>
						</div>
						<div className="w-full flex justify-between items-center ">
							<h1 className="text-3xl font-bold">{data.rating.toFixed(1)}</h1>
							<div className="flex justify-center items-center bg-yellow-400/10 text-yellow-400/80 p-2 rounded-2xl">
								<Star css="" s={30} />
							</div>
						</div>
					</div>
				</Card>
			</div>
			<div className="flex justify-between items-center gap-4 w-full">
				<LineChart title="Revenue Overview" subtitle="Gross processed volume" prefix="$" data={data.profit_history} labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]} />
				<CircleChart
				product="Nodes"
					data={[
						{ name: "Europe", value: 320, color:"#0ea5e9" },
						{ name: "US East", value: 430, color:"#8b5cf6" },
						{ name: "AP south", value: 140, color:"#06b6d4" },
						{ name: "Other", value: 500, color:"#475569" },
					]}
				/>
			</div>
			<Col_chart x="Months" y="Traffic" cols={cols} />
		</>
	);
}

function Card({ children }: { children: React.ReactNode }) {
	return <div className="flex justify-center items-center bg-linear-to-r from-(--clr-surface) to-(--clr-surface-accent) relative w-[calc(33%-16px)] min-w-[200px] h-45 overflow-hidden rounded-2xl border border-(--clr-surface-light2)">{children}</div>;
}
