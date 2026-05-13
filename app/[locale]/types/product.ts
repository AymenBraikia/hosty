export interface hostService {
	type: "Cloud VDS" | "Cloud VPS" | "Dedicated Server";
	id: number;
	description?: string;
	price: number;
	most_popular?: boolean;
	badge?: string;
	discount?: number;
	perks?: string[];
	specs?: { cpu: number; ram: number; storage: string; bandwidth: string };
	traffic: number[];
	usage: number;
	active: boolean;
	available: boolean;
	users: string[];
	ip: string;
}
export interface domain {
	type: "Domain";
	id: number;
	name: string;
	extension: string;
	price: number;
	description?: string;
	discount?: number;
	perks?: string[];
	active: boolean;
}

export interface hostServiceSub extends hostService {
	amount: number;
	started_at: Date | string;
	expire_at: Date | string;
	role: "owner" | "admin";
}

export interface domainSub extends domain {
	years: number;
	started_at: Date | string;
	expire_at: Date | string;
	role: "owner" | "admin";
}

export interface order {
	id: string;
	user_email: string;
	items: (hostServiceSub | domainSub)[];
	total_amount: number;
	vat_amount: number;
	discount_amount: number;
	amount_to_pay: number;
	status: "Pending" | "Completed" | "Failed";
	created_at: Date;
}

export interface Bill {
	date: string;
	description: string;
	price: number;
	paid: boolean;
	id: string;
}

export interface Domain {
	name: string;
	reg: string;
	exp: string;
	status: boolean;
	renew: boolean;
}
export interface instance {
	name: string;
	status: boolean;
	ip: string;
	cpu: number;
}

export interface admin_data {
	profit_history: number[];
	last_revenue: number;
	revenue: number;
	nodes: number;
	uptime: number;
	system_load: number;
	performence_traffic: number[];
	inventory: hostService[];
	recent_orders: { id: string; date: string | Date; amount: number; status: "Completed" | "Pending" | "Failed" }[];
	users: {
		full_name: string;
		email: string;
		verified: boolean;
		admin: boolean;
		active_subscription: {
			id: number;
			price: number;
			type: "Domain" | "Cloud VPS" | "Cloud VDS" | "Dedicated Server";
			started: string | Date;
			expire: string | Date;
			role: "owner" | "admin";
		}[];
		total_spent: number;
	}[];
	spendings: number;
	total_sales: number;
	total_profit: number;
	traffic: number;
	rating: number;
	last_uptime: number;
	last_active_nodes: number;
	last_rating: number;
	last_spendings: number;
	last_system_last_load: number;
}
