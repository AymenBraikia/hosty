import clientPromise from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
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
	if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

	return NextResponse.json({ bills: user.billing }, { status: 200 });
}
