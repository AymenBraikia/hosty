"use server";

import User from "@/app/[locale]/types/user";
import { userCollection } from "@/app/db/collections";
import { verifyJwt } from "@/lib/jwt";
import { cookies } from "next/headers";

interface UserData {
	first_name: string;
	last_name: string;
	email: string;
	verified_email: boolean;
	tfa_enabled: boolean;
	notifications: {
		billing: boolean;
		maintenance: boolean;
		marketing: boolean;
	};
}

export default async function getUserSettings(): Promise<UserData | undefined> {
	const cookieStore = await cookies();

	const token = cookieStore.get("accessToken")?.value;

	let payload = null;

	if (!token) return;
	else {
		payload = verifyJwt(token);

		if (!payload) return;
	}

	const user = await userCollection.findOne<User>({ email: payload!.email });

	return user ? { first_name: user.first_name, last_name: user.last_name, email: user.email, verified_email: user.verified_email, tfa_enabled: user.twoFactorAuth.enabled, notifications: user.notifications } : undefined;
}
