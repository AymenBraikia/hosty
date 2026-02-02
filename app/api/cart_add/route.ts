import { domain, hostService } from "@/app/[locale]/types/product";
import clientPromise from "@/lib/db";
import { exts } from "@/lib/domain_pricing";
import get_services from "@/lib/get_service_data";
import { verifyJwt } from "@/lib/jwt";
import { Collection, WithId } from "mongodb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const domainRegex = /^(?=.{1,253}$)(?!-)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[A-Za-z]{2,63}$/;

export async function POST(req: Request) {
	const cookieStore = await cookies();
	const client = await clientPromise;

	const token = cookieStore.get("accessToken")?.value;

	let payload = null;

	if (!token) return NextResponse.json({ redirect: "/login" }, { status: 401 });
	else {
		payload = verifyJwt(token);

		if (!payload) return NextResponse.json({ redirect: "/login" }, { status: 401 });
	}

	const { id, domain } = await req.json();
	const db: Collection<{ email: string; cart: (domain | hostService)[]; wish_list: (domain | hostService)[] }> = client.db("hosty").collection("users");

	// domain
	if (typeof domain == "string" && domain.match(domainRegex)) {
		const service = {
			type: "Domain",
			id: -1,
			name: domain,
			price: exts.find((e) => domain.endsWith(e.tld))?.firstYear || 0,
			description: "Domain Registration",
			amount: 1,
		} as domain;

		if (await db.findOne({ email: payload!.email, cart: service })) return NextResponse.json({ message: "Item already in cart" }, { status: 400 });

		await db.updateOne({ email: payload!.email }, { $addToSet: { cart: { ...service, amount: 1 } }, $pull: { wish_list: { id } } });

		return NextResponse.json({ message: "Item added to cart" }, { status: 200 });
	}

	// host service
	if (typeof id != "number" || id < 0) return NextResponse.json({ message: "Item not found" }, { status: 400 });

	const service = (await get_services(id)) as domain | hostService | Set<WithId<Document>> | null;

	if (!service) return NextResponse.json({ message: "Item not found" }, { status: 400 });
	if (service instanceof Set) return NextResponse.json({ message: "Item not found" }, { status: 400 });

	if (await db.findOne({ email: payload!.email, cart: service })) return NextResponse.json({ message: "Item already in cart" }, { status: 400 });

	await db.updateOne({ email: payload!.email }, { $addToSet: { cart: { ...service, amount: 1 } }, $pull: { wish_list: { id } } });

	return NextResponse.json({ message: "Item added to cart" }, { status: 200 });
}
