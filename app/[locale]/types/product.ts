interface serviceBase {
    price: number;
    discount?: number;
}

export interface hostService extends serviceBase {
    id: number;
    type: "Cloud VDS" | "Cloud VPS" | "Dedicated Server";
    description?: string;
    most_popular?: boolean;
    badge?: string;
    perks?: string[];
    specs: { cpu: number; ram: number; storage: string; bandwidth: string };
    traffic: number[];
    usage: number;
    active: boolean;
    available: boolean;
    users: string[];
    ip: string;
    os: "Ubuntu 18.04" | "Ubuntu 20.04" | "Ubuntu 22.04" | "Ubuntu 24.04" | "Debian 10" | "Debian 11" | "Debian 12" | "Windows Server 2012" | "Windows Server 2016" | "Windows Server 2019" | "Windows Server 2022" | "Windows Server 2025";
}
export interface domain extends serviceBase {
    type: "Domain";
    name: string;
    extension: string;
    id: undefined;
}

export interface hostServiceOrder extends hostService {
    amount: number;
    renew: boolean;
    role: "owner";
}

export interface domainOrder extends domain {
    amount: number;
    renew: boolean;
    role: "owner";
}

export interface hostServiceSub extends hostService {
    amount: number;
    started_at: Date | string;
    expire_at: Date | string;
    renew: boolean;
    role: "owner" | "admin";
    suspended: boolean;
    active: boolean;
}

export interface domainSub extends domain {
    years: number;
    amount: number;
    started_at: Date | string;
    expire_at: Date | string;
    renew: boolean;
    role: "owner" | "admin";
    suspended: boolean;
    active: boolean;
}

export interface order {
    id: string;
    user_email: string;
    items: (hostServiceSub | domainSub)[];
    total_amount: number;
    vat_amount: number;
    discount_amount: number;
    amount_to_pay: number;
    status: "Pending" | "Completed" | "Failed";
    created_at: Date;
}

export interface Bill {
    date: string;
    description: string;
    price: number;
    paid: boolean;
    id: string;
}

export interface Domain {
    name: string;
    reg: string;
    exp: string;
    status: boolean;
    renew: boolean;
}
export interface instance {
    name: string;
    status: boolean;
    ip: string;
    cpu: number;
}

export interface admin_data {
    profit_history: number[];
    last_revenue: number;
    revenue: number;
    nodes: number;
    uptime: number;
    system_load: number;
    performence_traffic: number[];
    inventory: hostService[];
    recent_orders: { id: string; date: string | Date; amount: number; status: "Completed" | "Pending" | "Failed" }[];
    users: {
        full_name: string;
        email: string;
        verified: boolean;
        suspended: boolean;
        admin: boolean;
        active_subscription: {
            id: number | null;
            price: number;
            type: "Domain" | "Cloud VPS" | "Cloud VDS" | "Dedicated Server";
            started: string | Date;
            expire: string | Date;
            role: "owner" | "admin";
            renew: boolean;
            suspended: boolean;
        }[];
        total_spent: number;
    }[];
    spendings: number;
    total_sales: number;
    total_profit: number;
    traffic: number;
    rating: number;
    last_uptime: number;
    last_active_nodes: number;
    last_rating: number;
    last_spendings: number;
    last_system_last_load: number;
}

export type OS =
    | "Ubuntu 18.04"
    | "Ubuntu 20.04"
    | "Ubuntu 22.04"
    | "Ubuntu 24.04"
    | "Debian 10"
    | "Debian 11"
    | "Debian 12"
    | "Windows Server 2012"
    | "Windows Server 2016"
    | "Windows Server 2019"
    | "Windows Server 2022"
    | "Windows Server 2025";
