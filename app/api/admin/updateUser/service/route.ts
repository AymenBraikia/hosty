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
    const { id, exp_date, role, renew, email } = await req.json();

    const new_expire = new Date(exp_date);
    if (isNaN(new_expire.getTime())) return NextResponse.json({ error: "Invalid ending date" }, { status: 400 });

    const target = await userCollection.findOne({ email });
    if (!target) return NextResponse.json({ error: "Target user not found" }, { status: 404 });

    const service = target.services.compute.find((s) => s.id == id);
    if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });
    // if (service.id !== service_id) return NextResponse.json({ error: "Service mismatch" }, { status: 409 });

    const started = service.started_at ? new Date(service.started_at) : null;
    if (started && !isNaN(started.getTime()) && new_expire.getTime() <= started.getTime() && new_expire.getTime() <= new Date().getTime()) {
        return NextResponse.json({ error: "Ending date must be after the purchase date and after current date" }, { status: 400 });
    }

    const result = await userCollection.updateOne(
        { email },
        {
            $set: {
                [`services.${target.services.compute.indexOf(service)}.role`]: role,
                [`services.${target.services.compute.indexOf(service)}.expire_at`]: new_expire,
                [`services.${target.services.compute.indexOf(service)}.renew`]: renew,
            },
        },
    );

    if (result.matchedCount === 0) return NextResponse.json({ error: "Service not found" }, { status: 404 });

    return NextResponse.json({ message: "Service updated", expire: new_expire.toISOString(), role }, { status: 200 });
}
