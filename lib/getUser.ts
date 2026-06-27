"use server";

import { domainOrder, domainSub, hostServiceOrder, hostServiceSub } from "@/app/[locale]/types/product";
import User from "@/app/[locale]/types/user";
import { userCollection } from "@/app/db/collections";
import { verifyJwt } from "@/lib/jwt";
import { cookies } from "next/headers";

interface UserData {
    cart: (domainOrder | hostServiceOrder)[];
    wish_list: (domainOrder | hostServiceOrder)[];
    services: (domainSub | hostServiceSub)[];
    name: string;
    email: string;
    recent_activity: { title: string; description: string; date: string; status: number; id: string }[];
}

function serializeDoc(doc: unknown) {
    return JSON.parse(JSON.stringify(doc));
}

export default async function getUser(): Promise<UserData | undefined> {
    const cookieStore = await cookies();

    const token = cookieStore.get("accessToken")?.value;
    if (!token) return;

    const payload = verifyJwt(token);
    if (!payload) return;

    const user = await userCollection.findOne<User>({ email: payload.email });

    if (!user) return;

    return serializeDoc({
        cart: [...user.cart.compute, ...user.cart.domains],
        wish_list: [...user.wish_list.compute, ...user.wish_list.domains],
        services: [...user.services.compute, ...user.services.domains],
        recent_activity: user.recent_activity,
        name: user.first_name,
        email: user.email,
    });
}
