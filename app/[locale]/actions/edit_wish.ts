"use server";

import getUser from "@/lib/getUser";
import { revalidatePath } from "next/cache";
import { userCollection } from "@/app/db/collections";

export async function editWish({ id, domain, amount }: { id?: number; domain?: string; amount?: number }): Promise<void> {
    const user = await getUser();

    if (!user) return;

    return await new Promise(async (resolve, reject) => {
        const product = user.wish_list.find((e) => ("id" in e ? e.id == id : e.name == domain));
        if (!product) return reject("product is not in wish list");

        const filter = id ? { email: user.email, "wish_list.id": id } : { email: user.email, "wish_list.name": domain };

        await userCollection.updateOne(filter, {
            $set: {
                "wish_list.$.amount": amount,
            },
        });

        revalidatePath("/");

        return resolve();
    });
}
