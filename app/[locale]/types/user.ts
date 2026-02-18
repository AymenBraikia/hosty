import { domain, hostService } from "./product";

export default interface User {
	email: string;
	verified_email:boolean;
	first_name: string;
	last_name: string;
	password: string;
	cart: (hostService | domain)[];
	wish_list: (domain | hostService)[];
	services: (domain | hostService)[];
	created_at: Date;
	first_purchase: boolean;
	twoFactorAuth: {
		enabled: boolean;
		secret: null | string;
	};
	notifications: {
		billing: boolean;
		maintenance: boolean;
		marketing: boolean;
	};
}
