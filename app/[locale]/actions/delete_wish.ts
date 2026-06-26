"use server";

import getUser from "@/lib/getUser";
import { revalidatePath } from "next/cache";
import { userCollection } from "@/app/db/collections";

export async function deleteWish({ id, domain }: { id?: number; domain?: string }): Promise<void> {
    const user = await getUser();

    if (!user) return;

    return await new Promise(async (resolve, reject) => {
        const service = user.wish_list.find((e) => ("id" in e ? e.id == id : e.name == domain));
        if (!service) return reject("item is not in wish list");
        const target = id ? { "wish_list.compute": service } : { "wish_list.domains": service };

        await userCollection.updateOne({ email: user.email }, { $pull: target });
        revalidatePath("/");

        return resolve();
    });
}
