import clientPromise from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const client = await clientPromise;

	const cookieStore = await cookies();
	const token = cookieStore.get("accessToken")?.value;

	if (!token) return NextResponse.json({ redirect: "/login" }, { status: 401 });
	const payload = verifyJwt(token);
	if (!payload) return NextResponse.json({ redirect: "/login" }, { status: 401 });

	const users = client.db("hosty").collection("users");

	const admin = await users.findOne({ email: payload.email });
	if (!admin) return NextResponse.json({ error: "User not found" }, { status: 404 });
	if (!admin.admin) return NextResponse.json({ error: "User does not have admin perms." }, { status: 403 });

	const { user_email, service_index, service_id, role, expire } = await req.json();

	if (typeof user_email != "string" || !user_email) return NextResponse.json({ error: "Invalid user email" }, { status: 400 });
	if (typeof service_index != "number" || service_index < 0) return NextResponse.json({ error: "Invalid service index" }, { status: 400 });
	if (typeof service_id != "number") return NextResponse.json({ error: "Invalid service id" }, { status: 400 });
	if (role != "owner" && role != "admin") return NextResponse.json({ error: "Invalid role" }, { status: 400 });

	const new_expire = new Date(expire);
	if (isNaN(new_expire.getTime())) return NextResponse.json({ error: "Invalid ending date" }, { status: 400 });

	const target = await users.findOne({ email: user_email });
	if (!target) return NextResponse.json({ error: "Target user not found" }, { status: 404 });

	const service = target.services?.[service_index];
	if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });
	if (service.id !== service_id) return NextResponse.json({ error: "Service mismatch" }, { status: 409 });

	const started = service.started_at ? new Date(service.started_at) : null;
	if (started && !isNaN(started.getTime()) && new_expire.getTime() <= started.getTime()) {
		return NextResponse.json({ error: "Ending date must be after the purchase date" }, { status: 400 });
	}

	const result = await users.updateOne(
		{ email: user_email },
		{
			$set: {
				[`services.${service_index}.role`]: role,
				[`services.${service_index}.expire_at`]: new_expire,
			},
		}
	);

	if (result.matchedCount === 0) return NextResponse.json({ error: "Service not found" }, { status: 404 });

	return NextResponse.json({ message: "Service updated", expire: new_expire.toISOString(), role }, { status: 200 });
}
