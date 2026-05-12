import clientPromise from "@/lib/db";
import get_admin_data from "@/lib/get_admin_data";
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
	if (!user.admin) return NextResponse.json({ error: "User does not have admin perms." }, { status: 404 });

	const services = await get_admin_data();

	return NextResponse.json({ services }, { status: 200 });
}
