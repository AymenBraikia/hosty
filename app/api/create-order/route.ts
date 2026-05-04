import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/paypal";
import { verifyJwt } from "@/lib/jwt";
import { cookies } from "next/headers";
import clientPromise from "@/lib/db";
import { UpdateFilter } from "mongodb";

const VAT_RATE = 0.1; // 10% VAT
const first_purchase_discount = 0.3; // 30% discount for first purchase

export async function POST() {
	const client = await clientPromise;
	const token = await getAccessToken();

	const cookieStore = await cookies();
	const jwt_token = cookieStore.get("accessToken")?.value;

	let payload = null;

	if (!jwt_token) return NextResponse.json({ redirect: "/login" }, { status: 401 });
	else {
		payload = verifyJwt(jwt_token);

		if (!payload) return NextResponse.json({ redirect: "/login" }, { status: 401 });
	}
	const user = await client.db("hosty").collection("users").findOne({ email: payload!.email });

	if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

	const cart = user.cart as { type: string; name?: string; id: number; specs?: { cpu: number; ram: number; bandwidth: string; storage: string }; description: string; price: number; amount: number }[];
	const first_purchase = user.first_purchase as boolean;

	const items = cart.map((item) => {
		return {
			name: item.type,
			description: item.type == "Domain" ? `Domain Registration for ${item.name}` : item.description,
			quantity: item.amount.toString(),
			unit_amount: {
				currency_code: "USD",
				value: item.price,
			},
		};
	});

	const ref_id = `ORDER-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

	// calculate total amount
	const total_amount_cents: number = Math.round(cart.reduce((prev: number, item: { price: number; amount: number }) => prev + item.price * item.amount, 0) * 100);
	const total_amount: number = total_amount_cents / 100;
	// calculate VAT tax
	const vat_amount_cents: number = Math.round(total_amount * VAT_RATE * 100);
	const vat_amount: number = vat_amount_cents / 100;
	// calculate discount
	const discount_amount_cents: number = Math.round(first_purchase ? total_amount * first_purchase_discount * 100 : 0);
	const discount_amount: number = discount_amount_cents / 100;
	// calculate final amount to pay
	const amount_to_pay_cents = Math.round(total_amount_cents + vat_amount_cents - discount_amount_cents);
	const amount_to_pay = amount_to_pay_cents / 100;

	const res = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			intent: "CAPTURE",
			purchase_units: [
				{
					reference_id: ref_id, // unique id to track the product
					description: "Hosty Hosting Services",
					custom_id: ref_id,
					items,

					amount: {
						currency_code: "USD",
						value: amount_to_pay, // SERVER decides price
						breakdown: {
							item_total: { currency_code: "USD", value: total_amount },
							tax_total: { currency_code: "USD", value: vat_amount },
							handling: { currency_code: "USD", value: "0.00" },
							discount: { currency_code: "USD", value: discount_amount },
						},
					},

					application_context: {
						brand_name: "Hosty",
						locale: "en-US",
						landing_page: "LOGIN",
						shipping_preference: "NO_SHIPPING",
						user_action: "PAY_NOW",

						return_url: "http://localhost:3000/dashboard/",
						cancel_url: "http://localhost:3000/cart/",
					},
				},
			],
		}),
	});

	const order = await res.json();

	// register the order in the database with status "Pending"
	await client.db("hosty").collection("orders").insertOne({
		id: ref_id,
		user_email: payload.email,
		items: cart,
		total_amount,
		vat_amount,
		discount_amount,
		amount_to_pay,
		status: "Pending",
		created_at: new Date(),
	});
	if (order.id) {
		const activity = { title: "Purchase", description: "Purchasing: " + items.map((e) => e.name), date: new Date().toDateString(), status: 0, id: ref_id };

		await client
			.db("hosty")
			.collection("users")
			.findOneAndUpdate(
				{ email: user.email },
				{
					$push: {
						recent_activity: activity,
					} as UpdateFilter<Document>,
				},
			);

		return NextResponse.json({ id: order.id });
	} else return NextResponse.json({ error: order });
}
