import { userCollection } from "@/app/db/collections";
import { verifyJwt } from "@/lib/jwt";
import { verify_2fa } from "@/lib/verify_2fa";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { code } = await request.json();

	const cookieStore = await cookies();

	const token = cookieStore.get("accessToken")?.value;

	let payload = null;

	if (!token) return NextResponse.json({ redirect: "/login" }, { status: 401 });
	else {
		payload = verifyJwt(token);

		if (!payload) return NextResponse.json({ redirect: "/login" }, { status: 401 });
	}

	const user = await userCollection.findOne({ email: payload.email });
	if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

	const secret = user?.twoFactorAuth?.secret;
	if (!secret) return NextResponse.json({ error: "2FA not set up" }, { status: 400 });

	if (user.twoFactorAuth.enabled) return NextResponse.json({ error: "2FA already enabled" }, { status: 400 });

	try {
		const result = await verify_2fa(secret, code);

		if (result) {
			await userCollection.updateOne({ email: payload.email }, { $set: { "twoFactorAuth.enabled": true } });
			return NextResponse.json({ success: true }, { status: 200 });
		} else return NextResponse.json({ success: false, error: "Invalid code" }, { status: 400 });
	} catch {
		return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
	}
}
