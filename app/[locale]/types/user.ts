import { Bill, domain, domainSub, hostService, hostServiceSub } from "./product";

export default interface User {
    email: string;
    verified_email: boolean;
    suspended: boolean;
    first_name: string;
    last_name: string;
    password: string;
    cart: (hostServiceSub | domainSub)[];
    wish_list: (hostServiceSub | domainSub)[];
    services: hostServiceSub[];
    recent_activity: { title: string; description: string; date: string; status: number; id: string }[];
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
    total_spent: number;
    monthly_spendings: number;
    admin: boolean;
    billing: Bill[];
}
