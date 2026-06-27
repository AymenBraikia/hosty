"use server";

import getUser from "@/lib/getUser";
import { revalidatePath } from "next/cache";
import { userCollection } from "@/app/db/collections";

export async function editCart({ id, domain, amount }: { id?: number; domain?: string; amount: number }): Promise<void> {
    const user = await getUser();

    if (!user) return;

    return await new Promise(async (resolve, reject) => {
        const product = user.cart.find((e) => (typeof e.id == "number" ? e.id == id : e.name == domain));
        if (!product) return reject("product is not in cart");

        const filter = id ? { email: user.email, "cart.compute.id": id } : { email: user.email, "cart.domains.name": domain };
        const setter = id ? { "cart.compute.$.amount": amount } : { "cart.domains.$.amount": amount };
        await userCollection.updateOne(filter, {
            $set: setter,
        });

        revalidatePath("/");

        return resolve();
    });
}
