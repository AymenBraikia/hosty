import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
	try {
		const cookieStore = await cookies();

		cookieStore.delete("accessToken");
		cookieStore.delete("name");

		return NextResponse.json({ redirect: "/login" }, { status: 200 });
	} catch {
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
