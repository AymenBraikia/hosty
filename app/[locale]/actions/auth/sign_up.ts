"use server";
import { userCollection } from "@/app/db/collections";
import { revalidatePath } from "next/cache";
import User from "../../types/user";
import { signJwtAccessToken } from "@/lib/jwt";
import { cookies } from "next/headers";

const reg = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/,
};

export async function signUp(data: FormData): Promise<{ error: string } | void> {
    const firstName = data.get("firstName") as string | null;
    const lastName = data.get("lastName") as string | null;
    const email = data.get("email") as string | null;
    const password = data.get("password") as string | null;

    if (!firstName || !lastName || !email || !password) return;

    return await new Promise(async (resolve) => {
        if (!reg.email.test(email)) return resolve({ error: "Invalid email format" });
        if (!reg.password.test(password)) return resolve({ error: "Password does not meet complexity requirements" });

        const exists = await userCollection.findOne({
            $or: [{ email }, { first_name: firstName, last_name: lastName }],
        });

        if (exists) return resolve({ error: "someone already exists try different email or name" });

        const cookieStore = await cookies();

        await userCollection.insertOne({
            email: email,
            suspended: false,
            verified_email: false,
            first_name: firstName,
            last_name: lastName,
            password: password,
            cart: { compute: [], domains: [] },
            wish_list: { compute: [], domains: [] },
            services: { compute: [], domains: [] },
            domains: [],
            billing: [],
            recent_activity: [],
            created_at: new Date(),
            first_purchase: true,
            twoFactorAuth: {
                enabled: false,
                secret: null,
            },
            notifications: {
                billing: true,
                maintenance: true,
                marketing: true,
            },
            total_spent: 0,
            monthly_spendings: 0,
            admin: false,
            failed_signin_attempts: [],
        } as User);

        const payload = {
            email: email,
            full_name: firstName + " " + lastName,
            admin: false,
        };

        const accessToken = signJwtAccessToken(payload);

        cookieStore.set({
            name: "accessToken",
            value: accessToken,
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
        });
        cookieStore.set({
            name: "name",
            value: firstName,
            httpOnly: false,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
        });

        revalidatePath("/");

        return resolve();
    });
}
