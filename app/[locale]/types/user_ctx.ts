import { domain, hostService } from "./product";

export default interface UserData {
    cart: (domain | hostService)[];
    wish_list: (domain | hostService)[];

}