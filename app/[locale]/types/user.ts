import { domain, hostService } from "./product";

export default interface User {
	email: string;
	first_name: string;
	last_name: string;
	password: string;
	cart: hostService | domain[];
	wish_list: hostService | domain[];
}
