import Code from "./svg/code";
import Headphones from "./svg/headphones";
import Scale from "./svg/scale";
import Shield from "./svg/shield";
import Thunder from "./svg/thunder";
import Web from "./svg/web";

const perks = [
	{ title: "Blazing Fast NVMe", description: "100% NVMe storage architecture delivers up to 10x faster I/O performance than traditional SSD hosting.", icon: <Thunder s={30} color="var(--clr-primary)" /> },
	{ title: "Ironclad Security", description: "Automated daily backups, free SSLs, and AI-driven DDoS protection keep your data safe 24/7.", icon: <Shield s={30} color="var(--clr-primary)" /> },
	{ title: "Global CDN", description: "Content is cached across 200+ edge locations worldwide, ensuring low latency for every user.", icon: <Web s={30} color="var(--clr-primary)" /> },
	{ title: "Developer Tools", description: "SSH access, Git integration, WP-CLI, and staging environments come standard with every plan.", icon: <Code s={30} color="var(--clr-primary)" /> },
	{ title: "24/7 Expert Support", description: "No bots. Chat with real engineers who can help debug issues within minutes, not hours.", icon: <Headphones s={30} color="var(--clr-primary)" /> },
	{ title: "Scalable Infrastructure", description: "Start small and scale up to huge clusters instantly without migrating data or downtime.", icon: <Scale s={30} color="var(--clr-primary)" /> },
];

export default function Perks() {
	return (
		<section className="h-fit min-h-dvh text-center py-30 max-md:py-15 flex flex-col justify-center items-center gap-12 bg-(--clr-surface-light2) px-6">
			<h1 className="font-black text-5xl max-md:text-4xl">
				Why developers switch to <span className="text_anim">Hosty</span>
			</h1>
			<p className="text-gray-400 text-xl text_shine">
				We don&apos;t just host your code; we optimize it. Experience the difference of a platform <br /> built by developers, for developers.
			</p>
			<div className="flex flex-wrap justify-center items-center gap-4">
				{perks.map((perk, i) => {
					return (
						<div key={i} className="w-[30%] text-start min-w-80 max-md:min-w-11/12 min-h-64 flex flex-col justify-center items-start bg-(--clr-surface) p-8 gap-6 rounded-2xl border border-(--clr-surface-light) transition hover:bg-(--clr-surface-light) group">
							<div className="w-14 h-14 bg-(--clr-surface-light2) border border-gray-700 rounded-full group-hover:scale-110 flex justify-center items-center">{perk.icon}</div>
							<h2 className="text-xl font-bold text-foreground">{perk.title}</h2>
							<p className="text-gray-400">{perk.description}</p>
						</div>
					);
				})}
			</div>
		</section>
	);
}
