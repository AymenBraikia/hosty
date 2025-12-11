import Image from "next/image";
import Star from "./svg/star";

type review = {
	name: string;
	role: string;
	stars: 1 | 2 | 3 | 4 | 5;
	content: string;
	img_url: string;
};

const reviews: review[] = [
	{
		name: "Sarah Jenkins",
		role: "CTO @ TechFlow",
		stars: 5,
		content: "Switching to Hosty was the best decision we made this year. Our API response times dropped by 60% instantly.",
		img_url: "/sarah.png",
	},
	{
		name: "David Chen",
		role: "Indie Developer",
		stars: 5,
		content: "The developer experience is unmatched. The CLI tool makes deploying my Next.js apps feel like magic.",
		img_url: "/david.png",
	},
	{
		name: "Elena Rodriguez",
		role: "Agency Owner",
		stars: 5,
		content: "Client sites are faster, support is actually helpful, and the pricing is transparent. Highly recommended.",
		img_url: "/elina.png",
	},
];

export default function Trust() {
	return (
		<section className="w-dvw h-fit p-30 flex flex-col justify-center items-center gap-16 bg-(--clr-surface)">
			<h2 className="text-4xl font-black">Trusted by 10,000+ Innovators</h2>
			<div className="flex justify-center items-center gap-6 w-full">
				{reviews.map((rev, i) => (
					<div key={i} className="w-[30%] flex flex-col gap-8 rounded-2xl border border-(--clr-surface-light2) p-8">
						<div className="flex justify-start items-center w-full">
							<Star s={16} color="#eab308" />
							<Star s={16} color="#eab308" />
							<Star s={16} color="#eab308" />
							<Star s={16} color="#eab308" />
							<Star s={16} color="#eab308" />
						</div>
						<p className="text-gray-300">&quot;{rev.content}&quot;</p>
						<div className="flex justify-start items-center gap-4">
							<div className="w-11 aspect-square rounded-full border border-(--clr-surface-light2) relative overflow-hidden">
								<Image src={rev.img_url} alt="profile picutre" fill />
							</div>
							<h6 className="font-bold flex flex-col justify-center items-start gap-0">
								<span>{rev.name}</span> <span className="font-medium text-[14px] text-gray-500">{rev.role}</span>
							</h6>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
