import { verify } from "otplib";

export async function verify_2fa(secret: string, code: string): Promise<boolean> {
    return (await verify({ secret, token: code })).valid;
}
