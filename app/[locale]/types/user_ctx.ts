import { domainOrder, domainSub, hostServiceOrder, hostServiceSub } from "./product";

export default interface UserData {
    cart: (domainOrder | hostServiceOrder)[];
    wish_list: (domainOrder | hostServiceOrder)[];
    services: (domainSub | hostServiceSub)[];
    recent_activity: { title: string; description: string; date: string; status: number; id: string }[];
}
