import clientPromise from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";
import { verify_2fa } from "@/lib/verify_2fa";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { code } = await request.json();
	const client = await clientPromise;

	const cookieStore = await cookies();

	const token = cookieStore.get("accessToken")?.value;

	let payload = null;

	if (!token) return NextResponse.json({ redirect: "/login" }, { status: 401 });
	else {
		payload = verifyJwt(token);

		if (!payload) return NextResponse.json({ redirect: "/login" }, { status: 401 });
	}

	const user = await client.db("hosty").collection("users").findOne({ email: payload.email });
	const secret = user?.twoFactorAuth?.secret;

	if (!secret) return NextResponse.json({ error: "2FA not set up" }, { status: 400 });

	const result = verify_2fa(secret, code);

	return result ? NextResponse.json({ success: true }, { status: 200 }) : NextResponse.json({ success: false, error: "Invalid code" }, { status: 400 });
}
