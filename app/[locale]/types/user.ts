import { Bill, domainOrder, domainSub, hostServiceOrder, hostServiceSub } from "./product";

export default interface User {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    created_at: Date;

    verified_email: boolean;
    first_purchase: boolean;
    suspended: boolean;
    admin: boolean;

    cart: { domains: domainOrder[]; compute: hostServiceOrder[] };
    wish_list: { domains: domainOrder[]; compute: hostServiceOrder[] };
    services: { domains: domainSub[]; compute: hostServiceSub[] };

    recent_activity: { title: string; description: string; date: string; status: number; id: string }[];

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
    billing: Bill[];
}
