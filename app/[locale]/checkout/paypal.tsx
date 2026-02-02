"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";

declare global {
	interface Window {
		paypal: {
			Buttons: ({}) => { render: (id: string) => void };
		};
	}
}

export default function PayPal() {
	const [sdk_state, set_sdk_state] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		if (!sdk_state && !window.paypal) return;

		window.paypal
			.Buttons({
				createOrder: async () => {
					const res = await fetch("/api/create-order", {
						method: "POST",
					});
					const data = await res.json();
					return data.id;
				},

				onApprove: async (data: { orderID: string }) => {
					const res = await fetch("/api/capture-order", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ orderID: data.orderID }),
					});

					if (res.ok) router.push("/dashboard");

					// payment is done perfectly
				},
			})
			.render("#paypal-button-container");
	}, [sdk_state]);

	return (
		<>
			<Script src="https://www.paypal.com/sdk/js?client-id=AbO0TiX6EMfc9aOHpRtLks_6iP1xW9opjN-d5BNwfeEbsyaOKAuYVBm0uYXfU2FkNcWGZZKz1z5KxDjY&currency=USD&components=buttons" strategy="afterInteractive" onLoad={() => set_sdk_state(true)} />

			<div id="paypal-button-container"></div>
		</>
	);
}
