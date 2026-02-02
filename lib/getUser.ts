"use server";

import { domain, hostService } from "@/app/[locale]/types/product";
import clientPromise from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";
import { cookies } from "next/headers";

export default async function getUser(): Promise<{ cart: [domain | hostService]; wish_list: [domain | hostService]; name: string } | undefined> {
	const cookieStore = await cookies();
	const client = await clientPromise;

	const token = cookieStore.get("accessToken")?.value;

	let payload = null;

	if (!token) return;
	else {
		payload = verifyJwt(token);

		if (!payload) return;
	}

	console.clear();
	console.log(payload);

	const db = client.db("hosty").collection("users");

	const user = (await db.findOne({ email: payload!.email })) as unknown as { cart: [domain | hostService]; wish_list: [domain | hostService]; first_name: string };

	return user ? { cart: user.cart, wish_list: user.wish_list, name: user.first_name } : undefined;
}
