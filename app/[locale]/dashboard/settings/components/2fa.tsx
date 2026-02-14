"use client";
import Check_box from "../../../components/cbox";
import { useState } from "react";
import QRCodeStyling from "qr-code-styling";
import Image from "next/image";
import dynamic from "next/dynamic";
import Button from "@/app/[locale]/components/button";
import Input from "../input";
const Popup = dynamic(() => import("@/app/[locale]/components/popup"), {
	ssr: false,
});

export default function TFA() {
	const [pop_active, set_pop_activity] = useState<boolean>(false);
	const [tfa_uri, set_tfa_uri] = useState<string | null>(null);
	const [err, set_err] = useState<string>("");
	const [action, set_action] = useState<"enable" | "disable">("enable");
	return (
		<div className="flex flex-col justify-center items-start bg-(--clr-surface2) rounded-2xl border border-(--clr-surface-light2) p-4">
			<Check_box
				action={async (state: boolean) => {
					set_pop_activity(true);

					if (state) {
						set_action("enable")
						const qr = await generate_qr();
						
						const blob = (await qr.getRawData("svg")) as Blob;
						
						const reader = new FileReader();

						reader.readAsDataURL(blob);
						reader.onloadend = () => set_tfa_uri(reader.result as string);
					} else {
						set_action("disable")
						set_tfa_uri(null);
					}
					return true;
				}}
				label="Two-Factor Authentication"
				state={false}
			/>
			<p className="text-gray-400 text-xs">Recommended: Secure your account with 2FA</p>

			<Popup open={pop_active}>
				<div className="relative flex justify-center items-center gap-8 p-8 py-16 bg-(--clr-surface) border border-(--clr-surface-light2) rounded-2xl">
					<Button content="Close" css="absolute right-2 top-2" action={() => set_pop_activity(false)} />
					{action == "enable" ? (
						<>
							<div className="w-full flex flex-col justify-center items-center gap-4">
								<h3 className="text-xl font-bold">Make your Account safer in 3 steps</h3>
								<div className="flex flex-col justify-center items-start">
									<h4 className="font-bold">Download an authenticator app</h4>
									<p className="max-w-80 text-gray-400">Download and install Google Authenticator in your phone or tablet</p>
								</div>
								<hr className="w-full text-(--clr-surface-light2)" />
								<div className="flex flex-col justify-center items-start">
									<h4 className="font-bold">Scan the QR code</h4>
									<p className="max-w-80 text-gray-400">Use your phone to scan the displayed QR code</p>
								</div>
								<hr className="w-full text-(--clr-surface-light2)" />
								<div className="flex flex-col justify-center items-start">
									<h4 className="font-bold">Log in with your code</h4>
									<p className="max-w-80 text-gray-400">Enter the 6 digits verification code generated</p>
								</div>
							</div>

							<div className="w-full max-w-[200px] flex flex-col justify-center items-center gap-4">
								{tfa_uri ? <Image className="bg-white" src={tfa_uri} width={200} height={200} alt="QR Code" /> : <div className="w-[200px] aspect-square loading"></div>}

								<div className="flex flex-col justify-center items-center gap-3 w-full">
									<Input
										styles={{ letterSpacing: 12 }}
										css="font-bold"
										max={6}
										id="tfa_val"
										err={err}
										lable="Enter the 6 digits Code"
										placeholder="000000"
										default=""
										action={async () => {
											const result = await auto_submit_tfa();
											if (!result) return;
											if (!result.error) set_pop_activity(false);
											else {
												set_err(result.error);
												setTimeout(() => set_err(""), 3e3);
											}
										}}
									/>
									<Button
										action={async () => {
											const result = await submit_tfa();
											if (!result.error) set_pop_activity(false);
											else {
												set_err(result.error);
												setTimeout(() => set_err(""), 3e3);
											}
										}}
										content="Activate"
										css="bg_anim w-full"
									/>
								</div>
							</div>
						</>
					) : (
						<>
							<div className="w-full flex flex-col justify-center items-center gap-4">
								<h3 className="text-xl font-bold">Disable 2FA in 2 steps</h3>
								<div className="flex flex-col justify-center items-start">
									<h4 className="font-bold">Get the 6 digits code</h4>
									<p className="max-w-80 text-gray-400">Go to Google Authenticator in your phone or tablet and find your 6 digits code</p>
								</div>
								<hr className="w-full text-(--clr-surface-light2)" />
								<div className="flex flex-col justify-center items-start">
									<h4 className="font-bold">Log in with your code</h4>
									<p className="max-w-80 text-gray-400">Enter the 6 digits verification code generated to disable 2FA</p>
								</div>
							</div>

							<div className="w-full max-w-[200px] flex flex-col justify-center items-center gap-4">
								<div className="flex flex-col justify-center items-center gap-3 w-full">
									<Input
										styles={{ letterSpacing: 12 }}
										css="font-bold"
										max={6}
										id="tfa_val"
										err={err}
										lable="Enter the 6 digits Code"
										placeholder="000000"
										default=""
										action={async () => {
											const result = await auto_disable_tfa();
											if (!result) return;
											if (!result.error) set_pop_activity(false);
											else {
												set_err(result.error);
												setTimeout(() => set_err(""), 3e3);
											}
										}}
									/>
									<Button
										action={async () => {
											const result = await disable_tfa();
											if (!result.error) set_pop_activity(false);
											else {
												set_err(result.error);
												setTimeout(() => set_err(""), 3e3);
											}
										}}
										content="Deactivate"
										css="bg_anim w-full"
									/>
								</div>
							</div>
						</>
					)}
				</div>
			</Popup>
		</div>
	);
}

async function generate_qr() {
	const uri = await (await fetch("/api/2fa_qr_code")).text();

	return new QRCodeStyling({
		width: 400,
		height: 400,
		margin: 0,
		type: "svg",
		data: uri,
		dotsOptions: {
			color: "#000000",
			type: "extra-rounded",
		},
		backgroundOptions: {
			color: "transparent",
		},
		cornersSquareOptions: {
			type: "extra-rounded",
		},
		image: "/qr_logo.png",

		imageOptions: {
			hideBackgroundDots: true,
			imageSize: 0.3,
			margin: 0,
		},
	});
}

async function submit_tfa(): Promise<{ success: boolean; error?: string }> {
	const code = (document.getElementById("tfa_val") as HTMLInputElement).value;

	if (!code || code.length !== 6) return { success: false, error: "6 digits code is required" };
	const req: { success: boolean; error?: string } = await (await fetch("/api/enable_2fa", { body: JSON.stringify({ code }), method: "post", headers: { "Content-Type": "application/json" } })).json();

	return req;
}

async function auto_submit_tfa(): Promise<{ success: boolean; error?: string } | void> {
	const code = (document.getElementById("tfa_val") as HTMLInputElement).value;

	if (!code || code.length !== 6) return;

	const req: { success: boolean; error?: string } = await (await fetch("/api/enable_2fa", { body: JSON.stringify({ code }), method: "post", headers: { "Content-Type": "application/json" } })).json();

	return req;
}

async function auto_disable_tfa() {
	const code = (document.getElementById("tfa_val") as HTMLInputElement).value;

	if (!code || code.length !== 6) return;

	const req: { success: boolean; error?: string } = await (await fetch("/api/disable_2fa", { body: JSON.stringify({ code }), method: "post", headers: { "Content-Type": "application/json" } })).json();

	return req;
}

async function disable_tfa(): Promise<{ success: boolean; error?: string }> {
	const code = (document.getElementById("tfa_val") as HTMLInputElement).value;

	if (!code || code.length !== 6) return { success: false, error: "6 digits code is required" };

	const req: { success: boolean; error?: string } = await (await fetch("/api/disable_2fa", { body: JSON.stringify({ code }), method: "post", headers: { "Content-Type": "application/json" } })).json();

	return req;
}
