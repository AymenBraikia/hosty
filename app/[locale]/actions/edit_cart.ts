"use server";

import getUser from "@/lib/getUser";
import { revalidatePath } from "next/cache";
import { userCollection } from "@/app/db/collections";

export async function editCart({ id, domain, amount }: { id?: number; domain?: string; amount?: number }): Promise<void> {
    const user = await getUser();

    if (!user) return;

    return await new Promise(async (resolve, reject) => {
        const product = user.cart.find((e) => ("id" in e ? e.id == id : e.name == domain));
        if (!product) return reject("product is not in cart");

        const filter = id ? { email: user.email, "cart.id": id } : { email: user.email, "cart.name": domain };

        await userCollection.updateOne(filter, {
            $set: {
                "cart.$.amount": amount,
            },
        });

        revalidatePath("/");

        return resolve();
    });
}
