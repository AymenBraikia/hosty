"use server";

import getUser from "@/lib/getUser";
import { revalidatePath } from "next/cache";
import get_services from "@/lib/get_service_data";
import { hostService } from "../types/product";
import { WithId } from "mongodb";
import { userCollection } from "@/app/db/collections";

export async function addToCart(data: FormData): Promise<void> {
    const user = await getUser();

    if (!user) return;

    if (!data) return;
    const id = +data.get("id")! as number;
    const domain = data.get("domain");

    return await new Promise(async (resolve, reject) => {
        if (user.cart.find((e) => ("id" in e ? e.id == id : e.name == domain))) return reject("product already in cart");

        const product = (await get_services(id)) as WithId<hostService>;
        if (!product) return reject("product does not exist");

        await userCollection.updateOne({ email: user.email }, { $push: { "cart.compute": product } });
        revalidatePath("/");

        return resolve();
    });
}
