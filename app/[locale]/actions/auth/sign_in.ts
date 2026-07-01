"use server";
import { userCollection } from "@/app/db/collections";
import { revalidatePath } from "next/cache";
import { signJwtAccessToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { verify_2fa } from "@/lib/verify_2fa";
import { getIpAddress } from "./ipAddress";

const reg = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/,
    tfa: /^\d{6}$/,
};

export async function signIn(data: FormData): Promise<{ error: string } | void> {
    const email = data.get("email") as string | null;
    const password = data.get("password") as string | null;
    const twoFactorAuth = data.get("twoFactorAuth") as string | null;

    if (!email || !password) return;

    return await new Promise(async (resolve) => {
        if (!reg.email.test(email)) return resolve({ error: "Invalid email format" });
        if (!reg.password.test(password)) return resolve({ error: "Password does not meet complexity requirements" });

        const user = await userCollection.findOne({ email });

        if (!user) return resolve({ error: "Wrong email or password" });

        const ip = await getIpAddress();

        if (user.password != password) {
            if (user.failed_signin_attempts.find((e) => e.ip == ip && e.attempts >= 10)) return resolve({ error: "There have been several failed attempts to sign in please try again later" });

            const updated = await userCollection.updateOne({ email, "failed_signin_attempts.ip": ip }, { $inc: { "failed_signin_attempts.$.attempts": 1 } });

            if (updated.modifiedCount == 0) await userCollection.updateOne({ email }, { $push: { failed_signin_attempts: { ip, attempts: 1 } } });

            return resolve({ error: "Wrong email or password" });
        }

        if (user.twoFactorAuth.enabled)
            if (twoFactorAuth && reg.tfa.test(twoFactorAuth)) {
                if (!(await verify_2fa(user.twoFactorAuth.secret!, twoFactorAuth))) return resolve({ error: "Wrong 2FA code" });
            } else return resolve({ error: "Invalid 2FA code" });

        await userCollection.updateOne({ email, "failed_signin_attempts.ip": ip }, { $set: { "failed_signin_attempts.$.attempts": 0 } });

        const cookieStore = await cookies();

        const payload = {
            email: email,
            full_name: user.first_name + " " + user.last_name,
            admin: user.admin,
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
            value: user.first_name + " " + user.last_name,
            httpOnly: false,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
        });

        revalidatePath("/");

        return resolve();
    });
}

export async function signInDemo(): Promise<void> {
    return await new Promise(async (resolve) => {
        const cookieStore = await cookies();

        const payload = {
            email: "demo@hosty.io",
            full_name: "hosty" + " " + "demo",
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
            value: "hosty" + " " + "demo",
            httpOnly: false,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
        });

        revalidatePath("/");

        console.log("dam")

        return resolve();
    });
}
