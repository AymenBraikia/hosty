import { userCollection } from "@/app/db/collections";
import { verifyJwt } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) return NextResponse.json({ redirect: "/login" }, { status: 401 });
    const payload = verifyJwt(token);
    if (!payload) return NextResponse.json({ redirect: "/login" }, { status: 401 });

    const admin = await userCollection.findOne({ email: payload.email });
    if (!admin) return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    if (!admin.admin) return NextResponse.json({ error: "User does not have admin perms." }, { status: 403 });

    // const { user_email, service_index, service_id, role, expire } = await req.json();
    const { id, email } = await req.json();

    const target = await userCollection.findOne({ email });
    if (!target) return NextResponse.json({ error: "Target user not found" }, { status: 404 });

    const service = target.services.compute.find((s) => s.id == id);
    if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });

    const result = await userCollection.updateOne(
        { email },
        {
            $set: {
                [`services.${target.services.compute.indexOf(service)}.suspended`]: true,
            },
        },
    );

    if (result.matchedCount === 0) return NextResponse.json({ error: "Service not found" }, { status: 404 });

    return NextResponse.json({ message: "Service is suspended" }, { status: 200 });
}
