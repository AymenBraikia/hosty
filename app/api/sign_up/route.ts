import { client } from "@/lib/db";
import { signJwtAccessToken } from "@/lib/jwt";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { domain, hostService } from "@/app/[locale]/types/product";

const reg = {
	email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
	password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/,
};

export async function POST(req: Request) {
	try {
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
				first_name: first_name,
				last_name: last_name,
				password: password,
				cart: new Set<hostService | domain>([]),
				wish_list: new Set<hostService | domain>([]),
			});

			const payload = {
				email: email,
				first_name: first_name,
				last_name: last_name,
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
	} catch (e) {
		console.clear();
		console.log(e);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
