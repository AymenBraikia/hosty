import { client } from "@/lib/db";
import get_services from "@/lib/get_service_data";
import { verifyJwt } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const cookieStore = await cookies();

	const token = cookieStore.get("accessToken")?.value;

	let payload = null;

	if (!token) return NextResponse.json({ redirect: "/login" }, { status: 401 });
	else {
		payload = verifyJwt(token);

		if (!payload) return NextResponse.json({ redirect: "/login" }, { status: 401 });
	}

	const { id } = await req.json();

	if (!id) return NextResponse.json({ message: "Item not found" }, { status: 400 });

	const service = await get_services(id);

	if (!service) return NextResponse.json({ message: "Item not found" }, { status: 400 });

	const db = client.db("hosty").collection("users");

	await db.updateOne({ email: payload!.email }, { $addToSet: { cart: service } });

	return NextResponse.json({ message: "Item added to cart" }, { status: 200 });
}
