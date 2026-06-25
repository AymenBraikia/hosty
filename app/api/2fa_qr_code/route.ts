"use server";
import { generateSecret, generateURI } from "otplib";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";
import { userCollection } from "@/app/db/collections";

async function generate_qrcode(email: string): Promise<string | null> {
    const user = await userCollection.findOne({ email: email });
    if (!user) return null;

    const secret = generateSecret();

    await userCollection.updateOne({ email: email }, { $set: { "twoFactorAuth.secret": secret } });

    const uri = generateURI({ issuer: user.email, label: "hosty", secret });
    return uri;
}

export async function GET() {
    const cookieStore = await cookies();

    const token = cookieStore.get("accessToken")?.value;

    let payload = null;

    if (!token) return NextResponse.json({ redirect: "/login" }, { status: 401 });
    else {
        payload = verifyJwt(token);

        if (!payload) return NextResponse.json({ redirect: "/login" }, { status: 401 });
    }

    const qr_code = await generate_qrcode(payload.email);
    if (!qr_code) return new Response("Error generating QR code", { status: 500 });
    return new Response(qr_code, { status: 200 });
}
