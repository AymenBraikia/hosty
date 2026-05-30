"use server";

import { domain, hostService } from "@/app/[locale]/types/product";
import User from "@/app/[locale]/types/user";
import { userCollection } from "@/app/db/collections";
import { verifyJwt } from "@/lib/jwt";
import { cookies } from "next/headers";

interface UserData {
	cart: (domain | hostService)[];
	wish_list: (domain | hostService)[];
	services: (domain | hostService)[];
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
		cart: user.cart,
		wish_list: user.wish_list,
		services: user.services,
		recent_activity: user.recent_activity,
		name: user.first_name,
		email: user.email,
	});
}
