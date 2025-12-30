"use client";
import Button from "./components/button";

export default function NotFound() {
	return (
		<>
			<div className="w-dvw h-dvh flex justify-center items-center flex-col text-center gap-16">
				<h1 className="text-8xl font-black text_anim2">404 Not Found</h1>
				<h2 className="text-6xl font-black text_anim2">This page isn&apos;t here, but you&apos;re not lost.</h2>
				<p className="text-xl font-black text_anim2">
					You&apos;re in the right place to get your venture growing. <br />
					Start with the tools below or head to our home page to get started.
				</p>
				<Button content="Back to Home Page" url="/" css="bg_anim2 p-4" />
			</div>
		</>
	);
}
