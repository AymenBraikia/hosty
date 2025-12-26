import Image from "next/image";
import Star from "./svg/star";
import { useTranslations } from "next-intl";

type review = {
	name: string;
	role: string;
	stars: 1 | 2 | 3 | 4 | 5;
	content: string;
	img_url: string;
};


export default function Trust() {
	const t = useTranslations("trust");
	const reviews: review[] = [
		{
			name: "Sarah Jenkins",
			role: t("reviews.sarah.role"),
			stars: 5,
			content: t("reviews.sarah.content"),
			img_url: "/sarah.png",
		},
		{
			name: "David Chen",
			role: t("reviews.david.role"),
			stars: 5,
			content: t("reviews.david.content"),
			img_url: "/david.png",
		},
		{
			name: "Elena Rodriguez",
			role: t("reviews.elena.role"),
			stars: 5,
			content: t("reviews.elena.content"),
			img_url: "/elina.png",
		},
	];

	return (
		<section className="w-dvw h-fit p-30 flex flex-col justify-center items-center gap-16 bg-(--clr-surface) max-md:px-6">
			<h2 className="text-4xl font-black max-md:text-3xl max-md:text-center">{t("headline")}</h2>
			<div className="flex justify-center items-center gap-6 w-full max-md:flex-col">
				{reviews.map((rev, i) => (
					<div key={i} className="w-[30%] max-md:w-full flex flex-col gap-8 rounded-2xl border border-(--clr-surface-light2) p-8">
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
