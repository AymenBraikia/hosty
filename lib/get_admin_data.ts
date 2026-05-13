import { admin_data, hostService, order } from "@/app/[locale]/types/product";
import clientPromise from "./db";
import User from "@/app/[locale]/types/user";

interface Stats {
	type: "stats";
	last_revenue: number;
	total_profit: number;
	total_sales: number;
	spendings: number;
	rating: number;
	traffic: number;
	last_uptime: number;
	last_active_nodes: number;
	last_rating: number;
	last_spendings: number;
	last_system_last_load: number;
	profit_history: number[];
}

const services_collection = (await clientPromise).db("hosty").collection<hostService>("services");
const orders_collection = (await clientPromise).db("hosty").collection<order>("orders");
const users_collection = (await clientPromise).db("hosty").collection<User>("users");
const stats_collection = (await clientPromise).db("hosty").collection<Stats>("stats");

export default async function get_admin_data(): Promise<admin_data | undefined> {
	const timestamp = Date.now();
	const all_users = await users_collection.find({}).toArray();
	const stats = await stats_collection.findOne({ type: "stats" });

	const users = all_users.map((u) => ({
		full_name: u.first_name + " " + u.last_name,
		email: u.email,
		verified: u.verified_email,
		admin: u.admin,
		active_subscription: u.services.map((s) => ({
			id: s.id,
			price: s.price,
			type: s.type,
			started: s.started_at,
			expire: s.expire_at,
			role: s.role,
		})),
		total_spent: u.total_spent,
	}));

	const inventory = await services_collection.find({}).toArray();
	const nodes = inventory.filter((s) => s.users.length);

	const active_nodes = nodes.length;
	const uptime = Number(95 + +(Math.random() * 5).toFixed(2));
	const system_load = nodes.reduce((prev, current) => (prev += current.usage), 0);
	const performence_traffic = nodes.reduce((prev, current, i) => [...prev, current.traffic[i]], [0]);

	const rating = stats!.rating;
	const traffic = stats!.traffic;

	const spendings = stats!.spendings;
	const profit_history = stats!.profit_history;
	const total_profit = stats!.total_profit;
	const total_sales = stats!.total_sales;
	const last_revenue = stats!.last_revenue;
	const last_uptime = stats!.last_uptime;
	const last_system_last_load = stats!.last_system_last_load;
	const last_spendings = stats!.last_spendings;
	const last_active_nodes = stats!.last_active_nodes;
	const last_rating = stats!.last_rating;
	const revenue = all_users.reduce((prev, current) => prev + current.monthly_spendings, 0);
	const recent_orders = (await orders_collection.find({}).toArray()).filter((o) => timestamp - o.created_at.getTime() < 1e3 * 60 * 60 * 24 * 30).map((o) => ({ id: o.id, amount: o.amount_to_pay, date: o.created_at, status: o.status }));

	const data = {
		inventory,
		revenue,
		last_revenue,
		nodes: active_nodes,
		uptime,
		system_load,
		performence_traffic,
		recent_orders,
		users,
		rating,
		spendings,
		traffic,
		total_profit,
		total_sales,
		last_uptime,
		last_active_nodes,
		last_rating,
		last_spendings,
		last_system_last_load,
		profit_history,
	};

	return data;
}
