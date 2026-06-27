"use server";

import getUser from "@/lib/getUser";
import { revalidatePath } from "next/cache";
import get_services from "@/lib/get_service_data";
import { hostService } from "../types/product";
import { WithId } from "mongodb";
import { userCollection } from "@/app/db/collections";

export async function addToWish(data: FormData): Promise<void> {
    const user = await getUser();

    if (!user) return;

    if (!data) return;
    const id = +data.get("id")! as number;

    return await new Promise(async (resolve, reject) => {
        if ([...user.cart, ...user.wish_list].find((e) => typeof e.id == "number" && e.id == id)) return reject("product already in cart or wish list");

        const product = (await get_services(id)) as WithId<hostService>;
        if (!product) return reject("product does not exist");

        await userCollection.updateOne({ email: user.email }, { $push: { "wish_list.compute": product } });
        revalidatePath("/");

        return resolve();
    });
}
