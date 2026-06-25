import { domain, domainSub, hostService } from "@/app/[locale]/types/product";
import { userCollection } from "@/app/db/collections";
import { exts } from "@/lib/domain_pricing";
import get_services from "@/lib/get_service_data";
import { verifyJwt } from "@/lib/jwt";
import { WithId } from "mongodb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const domainRegex = /^(?=.{1,253}$)(?!-)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[A-Za-z]{2,63}$/;

export async function POST(req: Request) {
    const cookieStore = await cookies();

    const token = cookieStore.get("accessToken")?.value;

    let payload = null;

    if (!token) return NextResponse.json({ redirect: "/login" }, { status: 401 });
    else {
        payload = verifyJwt(token);

        if (!payload) return NextResponse.json({ redirect: "/login" }, { status: 401 });
    }

    const { id, domain } = await req.json();

    // domain
    if (typeof domain == "string" && domain.match(domainRegex)) {
        const started_at = new Date();
        const expire_at = new Date();
        expire_at.setFullYear(expire_at.getFullYear() + 1);

        const service = {
            type: "Domain",
            name: domain.split(".")[0],
            price: exts.find((e) => domain.endsWith(e.tld))?.firstYear || 0,
            description: "Domain Registration",
            years: 1,
            amount: 1,
            role: "owner",
            renew: true,
            started_at,
            expire_at,
            id: -1,
            active: true,
            extension: domain.split(".")[1],
        } as domainSub;

        if (await userCollection.findOne({ email: payload!.email, "cart.name": service.name })) return NextResponse.json({ message: "Item already in cart" }, { status: 400 });

        await userCollection.updateOne({ email: payload!.email }, { $addToSet: { cart: { ...service } }, $pull: { wish_list: { id } } });

        return NextResponse.json({ message: "Item added to cart" }, { status: 200 });
    }

    // host service
    if (typeof id != "number" || id < 0) return NextResponse.json({ message: "Item not found" }, { status: 400 });

    const service = (await get_services(id)) as hostService | Set<WithId<Document>> | null;

    if (!service) return NextResponse.json({ message: "Item not found" }, { status: 400 });
    if (service instanceof Set) return NextResponse.json({ message: "Item not found" }, { status: 400 });

    if (await userCollection.findOne({ email: payload!.email, "cart.id": service.id })) return NextResponse.json({ message: "Item already in cart" }, { status: 400 });

    await userCollection.updateOne(
        { email: payload!.email },
        { $addToSet: { cart: { ...service, amount: 1, started_at: new Date(), expire_at: new Date(Date.now() + 1e3 * 60 * 60 * 24 * 30), role: "owner", renew: true, suspended: false } }, $pull: { wish_list: { id } } },
    );

    return NextResponse.json({ message: "Item added to cart" }, { status: 200 });
}
