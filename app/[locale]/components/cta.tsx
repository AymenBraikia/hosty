import Button from "./button";

export default function Cta() {
	return (
		<section className="relative w-dvw h-fit p-30 flex justify-center items-center flex-col text-center gap-8 max-md:px-6">
			<h1 className="text-6xl font-black max-md:text-3xl text-center">Stop waiting. Start building</h1>
			<h4 className="text-xl font-bold max-md:text-2xl">Join the new standard of cloud hosting. 30-day money-back guarantee, no questions asked.</h4>
			<div className="flex justify-center items-center gap-8 max-md:flex-col max-md:w-full">
				<Button css="text-xl bg-white text-(--clr-accent) rounded-full hover:scale-105 max-md:w-full" styles={{ padding: 15 }} content="Launch Server" />
				<Button css="text-xl bg-white text-(--clr-accent2) rounded-full hover:scale-105 max-md:w-full" styles={{ padding: 15 }} content="View Documentation" />
			</div>
			<div className="bg-(--clr-accent) w-[150%] h-full absolute -z-10 opacity-30">
				<div className="w-full h-full shadow-[inset_0_0_80px_30px_black] bg-[url(https://www.transparenttextures.com/patterns/diamond-upholstery.png)]"></div>
			</div>
		</section>
	);
}
