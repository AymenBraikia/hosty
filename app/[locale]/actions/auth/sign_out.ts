"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function signOut(): Promise<void> {
    return await new Promise(async (resolve, reject) => {
        try {
            const cookieStore = await cookies();

            cookieStore.delete("accessToken");
            cookieStore.delete("name");

            revalidatePath("/");
            return resolve();
        } catch {
            return reject({ error: "Internal Server Error" });
        }
    });
}
