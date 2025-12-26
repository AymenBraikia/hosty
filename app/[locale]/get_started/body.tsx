"use client";
import Button from "../components/button";
import Input from "../components/input";

export default function Body() {
	return (
		<div className="w-dvw h-dvh flex justify-center items-center">
			<form className="w-[500px] p-12 rounded-2xl border border-(--clr-surface-light2) bg-(--clr-surface) flex justify-center items-center flex-col gap-4">
				<h1 className="text-4xl font-bold">Create Account</h1>
				<p className="text-xl text_shine">Start your journey with Hosty</p>

				<div className="flex flex-col justify-center items-center w-full gap-7 mt-6">
					<Input type="text" placeholder="Full Name" />
					<Input type="email" placeholder="Email Addres" />
					<Input type="password" placeholder="Password" />
					<Button css="bg_anim w-full text-2xl py-3 rounded-full" type="submit" content="submit" />
				</div>
			</form>
		</div>
	);
}
