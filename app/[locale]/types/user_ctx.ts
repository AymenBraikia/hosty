import { domain, hostService } from "./product";

export default interface UserData {
	cart: (domain | hostService)[];
	wish_list: (domain | hostService)[];
	services: (domain | hostService)[];
	recent_activity: { title: string; description: string; date: string; status: number; id: string }[];
}
