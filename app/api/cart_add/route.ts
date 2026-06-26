import { domainOrder, hostService, hostServiceOrder } from "@/app/[locale]/types/product";
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
        const service = {
            type: "Domain",
            name: domain.split(".")[0],
            price: exts.find((e) => domain.endsWith(e.tld))?.firstYear || 0,
            description: "Domain Registration",
            amount: 1,
            role: "owner",
            renew: true,
            active: true,
            extension: domain.split(".")[1],
        } as domainOrder;

        if (await userCollection.findOne({ email: payload!.email, "cart.name": service.name })) return NextResponse.json({ message: "Item already in cart" }, { status: 400 });

        await userCollection.updateOne({ email: payload!.email }, { $addToSet: { "cart.domains": service }, $pull: { "wish_list.domains": { name: service.name } } });

        return NextResponse.json({ message: "Item added to cart" }, { status: 200 });
    }

    // host service
    if (typeof id != "number" || id < 0) return NextResponse.json({ message: "Item not found" }, { status: 400 });

    const data = (await get_services(id)) as hostService | Set<WithId<Document>> | null;

    if (!data) return NextResponse.json({ message: "Item not found" }, { status: 400 });
    if (data instanceof Set) return NextResponse.json({ message: "Item not found" }, { status: 400 });

    if (await userCollection.findOne({ email: payload!.email, "cart.id": data.id })) return NextResponse.json({ message: "Item already in cart" }, { status: 400 });

    const service: hostServiceOrder = { ...data, amount: 1, renew: true, role: "owner" };

    await userCollection.updateOne({ email: payload!.email }, { $addToSet: { "cart.compute": service }, $pull: { "wish_list.compute": { id } } });

    return NextResponse.json({ message: "Item added to cart" }, { status: 200 });
}
