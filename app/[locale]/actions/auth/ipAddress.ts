// app/actions.ts
"use server";

import { headers } from "next/headers";

export async function getIpAddress() {
    const headerStore = await headers();

    const forwardedFor = headerStore.get("x-forwarded-for");
    const realIp = headerStore.get("x-real-ip");

    const vercelIp = headerStore.get("x-vercel-forwarded-for");
    const cloudflareIp = headerStore.get("cf-connecting-ip");

    let ip = "";

    if (forwardedFor) {
        ip = forwardedFor.split(",")[0].trim();
    } else if (realIp) {
        ip = realIp;
    } else if (cloudflareIp) {
        ip = cloudflareIp;
    } else if (vercelIp) {
        ip = vercelIp;
    } else {
        ip = "127.0.0.1";
    }

    if (ip.startsWith("::ffff:")) {
        ip = ip.replace("::ffff:", "");
    }

    return ip;
}
