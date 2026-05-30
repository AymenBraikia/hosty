import { userCollection } from "@/app/db/collections";
import { verifyJwt } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const cookieStore = await cookies();
	const token = cookieStore.get("accessToken")?.value;

	if (!token) return NextResponse.json({ redirect: "/login" }, { status: 401 });
	const payload = verifyJwt(token);
	if (!payload) return NextResponse.json({ redirect: "/login" }, { status: 401 });

	const admin = await userCollection.findOne({ email: payload.email });
	if (!admin) return NextResponse.json({ error: "Admin not found" }, { status: 404 });
	if (!admin.admin) return NextResponse.json({ error: "User does not have admin perms." }, { status: 403 });

	const { email, state } = await req.json();

	const user = await userCollection.findOneAndUpdate(
		{ email },
		{
			$set: {
				suspended: state,
			},
		},
	);
	if (!user) return NextResponse.json({ message: `User was not found` }, { status: 400 });

	return NextResponse.json({ message: `${user?.first_name + " " + user?.last_name} has been suspended` }, { status: 200 });
}
