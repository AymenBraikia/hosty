import { authenticator } from "otplib";

export function verify_2fa(secret: string, code: string): boolean {
    return authenticator.verify({ secret, token: code });
}