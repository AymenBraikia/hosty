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
	amount: number;
}
export interface domain {
	type: "Domain";
	id: number;
	name: string;
	extension: string;
	years: number;
	price: number;
	description?: string;
	discount?: number;
	perks?: string[];
	amount: number;
}

export interface order {
	id: string;
	user_email: string;
	items: (hostService | domain)[];
	total_amount: number;
	vat_amount: number;
	discount_amount: number;
	amount_to_pay: number;
	status: "Pending" | "Completed" | "Failed";
	created_at: Date;
}
