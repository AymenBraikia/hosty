export interface hostService {
	id: number;
	quantity: number;
	name: string;
	price: number;
	most_popular: boolean;
	discount?: number;
	perks?: string[];
	specs?: { cpu: number; ram: number; storage: string; bandwidth: string };
}
export interface domain {
	name: string;
	extension: string;
	years: number;
	price: number;
	discount?: number;
	perks?: string[];
}
