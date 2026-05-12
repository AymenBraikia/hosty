import clientPromise from "@/lib/db";
import { signJwtAccessToken } from "@/lib/jwt";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import User from "@/app/[locale]/types/user";

const reg = {
	email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
	password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/,
};

export async function POST(req: Request) {
	try {
		const client = await clientPromise;
		const cookieStore = await cookies();

		const body = await req.json();
		const { email, password, first_name, last_name, red } = body;

		if (!email || !password || !first_name || !last_name) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

		const collection = client.db("hosty").collection("users");

		if (!reg.email.test(email)) return NextResponse.json({ error: "Invalid email format" }, { status: 400 });

		if (!reg.password.test(password)) return NextResponse.json({ error: "Password does not meet complexity requirements" }, { status: 400 });

		try {
			if (await collection.findOne({ email: email })) return NextResponse.json({ error: "User already exists" }, { status: 400 });

			await collection.insertOne({
				email: email,
				verified_email: false,
				first_name: first_name,
				last_name: last_name,
				password: password,
				cart: [],
				wish_list: [],
				services: [],
				domains: [],
				billing: [],
				recent_activity: [],
				created_at: new Date(),
				first_purchase: true,
				twoFactorAuth: {
					enabled: false,
					secret: null,
				},
				notifications: {
					billing: true,
					maintenance: true,
					marketing: true,
				},
				total_spent: 0,
				monthly_spendings: 0,
				admin: false,
			} as User);

			const payload = {
				email: email,
				full_name: first_name + " " + last_name,
				admin: false,
			};

			const accessToken = signJwtAccessToken(payload);

			cookieStore.set({
				name: "accessToken",
				value: accessToken,
				httpOnly: true,
				path: "/",
				secure: process.env.NODE_ENV === "production",
				maxAge: 60 * 60 * 24 * 7,
			});
			cookieStore.set({
				name: "name",
				value: first_name,
				httpOnly: false,
				path: "/",
				secure: process.env.NODE_ENV === "production",
				maxAge: 60 * 60 * 24 * 7,
			});
		} catch {
			return NextResponse.json({ error: "An error occurred while signing up" }, { status: 400 });
		}

		return NextResponse.json({ redirect: red || "/dashboard" }, { status: 200 });
	} catch {
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
