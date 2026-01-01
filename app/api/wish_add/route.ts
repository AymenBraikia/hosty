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

	if (typeof id != "number" || id < 0) return NextResponse.json({ message: "Item not found" }, { status: 400 });

	const service = await get_services(id);

	if (!service) return NextResponse.json({ message: "Item not found" }, { status: 400 });

	const db = client.db("hosty").collection("users");

	if (await db.findOne({ email: payload!.email, wish_list: service })) return NextResponse.json({ message: "Item already in wish list" }, { status: 400 });
	if (await db.findOne({ email: payload!.email, cart: service })) return NextResponse.json({ message: "Item already in cart" }, { status: 400 });

	await db.updateOne({ email: payload!.email }, { $addToSet: { wish_list: { ...service, amount: 1 } } });

	return NextResponse.json({ message: "Item added to wish list" }, { status: 200 });
}
