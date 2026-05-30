import clientPromise from "@/lib/db";
import User from "../[locale]/types/user";
import { domain, hostService, order } from "../[locale]/types/product";

export const clientDB = await clientPromise;

export const db = clientDB.db("hosty");

export const userCollection = db.collection<User>("users");
export const statsCollection = db.collection<{
	type: "stats";
	total_profit: number;
	total_sales: number;
	spendings: number;
	rating: number;
	traffic: number;
	last_revenue: number;
	last_active_nodes: number;
	last_rating: number;
	last_uptime: number;
	last_spendings: number;
	last_system_last_load: number;
	profit_history: number[];
}>("stats");
export const ordersCollection = db.collection<order>("orders");
export const servicesCollection = db.collection<hostService>("services");
