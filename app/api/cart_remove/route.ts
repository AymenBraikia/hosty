import { domain, hostService } from "@/app/[locale]/types/product";
import User from "@/app/[locale]/types/user";
import { client } from "@/lib/db";
import get_services from "@/lib/get_service_data";
import { verifyJwt } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { id } = await req.json();

	const cookieStore = await cookies();

	const token = cookieStore.get("accessToken")?.value;

	let payload = null;

	if (!token) return NextResponse.json({ redirect: "/login" }, { status: 401 });
	else {
		payload = verifyJwt(token);

		if (!payload) return NextResponse.json({ redirect: "/login" }, { status: 401 });
	}

	if (typeof id != "number" || id < 0) return NextResponse.json({ message: "Item is not defined" }, { status: 400 });

	const service = (await get_services(id)) as unknown as hostService;

	if (!service) return NextResponse.json({ message: "Item not found" }, { status: 400 });

	const db = client.db("hosty").collection<User>("users");

	const item = await db.findOne({ email: payload!.email, "cart.id": id });

	if (!item) return NextResponse.json({ message: "Item is not in cart" }, { status: 400 });

	await db.updateOne({ email: payload!.email }, { $pull: { cart: { id } } as unknown as hostService | domain });

	return NextResponse.json({ message: "Item removed from cart" }, { status: 200 });
}
