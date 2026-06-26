"use server";

import getUser from "@/lib/getUser";
import { revalidatePath } from "next/cache";
import { userCollection } from "@/app/db/collections";

export async function deleteCart({ id, domain }: { id?: number; domain?: string }): Promise<void> {
    const user = await getUser();

    if (!user) return;

    return await new Promise(async (resolve, reject) => {
        const service = user.cart.find((e) => ("id" in e ? e.id == id : e.name == domain));
        if (!service) return reject("item is not in cart");
        const target = id ? { "cart.compute": service } : { "cart.domains": service };

        await userCollection.updateOne({ email: user.email }, { $pull: target });
        revalidatePath("/");

        return resolve();
    });
}
