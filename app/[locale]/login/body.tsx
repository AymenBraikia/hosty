"use client";
import { FormEvent, useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

const reg = {
	email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
	password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/,
};

export default function Body() {
	const [err, set_Err] = useState<string>("");
	const [notification_visible, set_not_visibility] = useState<boolean>(false);
	const [fetching, set_fetching] = useState<boolean>(false);

	const router = useRouter();

	return (
		<div className="w-dvw h-dvh flex justify-center items-center pt-16">
			<form
				className="w-[500px] p-12 rounded-2xl border border-(--clr-surface-light2) bg-(--clr-surface) flex justify-center items-center flex-col gap-4"
				onSubmit={async (e: FormEvent) => {
					e.preventDefault();
					if (fetching) return;

					const email = (document.getElementById("email") as HTMLInputElement).value;
					const password = (document.getElementById("password") as HTMLInputElement).value;

					if (!reg.email.test(email)) {
						set_not_visibility(true);
						set_Err("Email must be in the format name@example.com");
						return !notification_visible && setTimeout(() => set_not_visibility(false), 8000);
					}
					if (!reg.password.test(password)) {
						set_not_visibility(true);
						set_Err("Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.");
						return !notification_visible && setTimeout(() => set_not_visibility(false), 8000);
					}

					set_fetching(true);
					const data = {
						headers: {
							"Content-Type": "application/json",
						},
						method: "POST",
						body: JSON.stringify({ email: email, password: password }),
					};

					const res = await (await fetch("/api/login", data)).json();

					if (res.status !== 200 && res.error) {
						set_fetching(false);
						set_Err(res.error);
						set_not_visibility(true);
						return !notification_visible && setTimeout(() => set_not_visibility(false), 8000);
					}

					if (typeof res.redirect == "string") router.push(res.redirect);
				}}
			>
				<h1 className="text-4xl font-bold">Welcome Back</h1>
				<p className="text-xl text_shine">Enter your credentials to access your account</p>

				<div className="flex flex-col justify-center items-center w-full gap-7 mt-6">
					<Input req={true} id="email" type="email" placeholder="Email Addres" />
					<Input req={true} id="password" type="password" placeholder="Password" />
					<Button css={`bg_anim w-full text-2xl py-3 rounded-full ${fetching && "[cursor:not-allowed_!important] brightness-70"}`} type="submit" content="Log In" />
					<p className="text-gray-400">
						Don&apos;t have an account ?{" "}
						<Link className="text-(--clr-primary) font-bold" href={"/get_started"}>
							Get Started
						</Link>
					</p>
				</div>
			</form>
			{
				<div className={`bg-red-800/20 text-red-400 p-4 max-w-96 transition-all duration-150 ease-in-out fixed ${notification_visible ? "right-8 translate-x-0" : "right-0 translate-x-full "} bottom-8 min-w-32 min-h-8 z-50`}>
					{err}
					<div className={`absolute bottom-0 left-0 ${notification_visible ? "w-full [transition:all_8s_0s_linear]" : "w-0"} h-[3px] bg-red-400 `}></div>
				</div>
			}
		</div>
	);
}
