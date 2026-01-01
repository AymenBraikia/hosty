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
	discount?: number;
	perks?: string[];
	amount: number;
}
