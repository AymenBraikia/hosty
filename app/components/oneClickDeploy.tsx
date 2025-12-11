import Link from "next/link";
import Arrow from "./svg/arrow";
import WordPress from "./svg/wordPress";
import Drupal from "./svg/drupal";
import PrestaShop from "./svg/prestashop";
import OpenCart from "./svg/opencart";
import Joomla from "./svg/joomla";
import Magento from "./svg/magento";

const apps = [
	{ title: "WordPress", icon: <WordPress s={35} color="currentColor" /> },
	{ title: "Magento", icon: <Magento s={35} color="currentColor" /> },
	{ title: "Joomla", icon: <Joomla s={35} color="currentColor" /> },
	{ title: "Drupal", icon: <Drupal s={35} color="currentColor" /> },
	{ title: "PrestaShop", icon: <PrestaShop s={35} color="currentColor" /> },
	{ title: "OpenCart", icon: <OpenCart s={35} color="currentColor" /> },
];

export default function OneClickDeploy() {
	return (
		<section className="min-h-dvh w-dvw px-[10dvw] flex max-md:p-7 justify-center items-center text-center">
			<div className="min-h-1/2 w-full bg-(--clr-surface) flex max-md:flex-col justify-center items-center p-10 relative rounded-2xl border-2 border-(--clr-surface-light2) overflow-hidden">
				<div className="flex flex-col justify-center items-center gap-7 p-11 w-1/2 max-md:w-full z-10">
					<h2 className="text-4xl font-black max-sm:text-2xl">
						Deploy your favorite apps with <span className="text_anim2">1-Click</span>
					</h2>
					<p className="text_shine text-xl max-sm:text-base">Forget complex server configurations. Hosty&apos;s marketplace lets you launch production-ready instances of popular software instantly.</p>
					<Link className="text-(--clr-accent2) flex justify-center items-center w-fit font-bold transition gap-0 hover:text-(--clr-accent) hover:gap-2" href={"#"}>
						Browse Marketplace
						<Arrow color="currentColor" s={25} />
					</Link>
				</div>
				<div className="flex flex-wrap justify-center items-center gap-7 w-1/2 max-md:w-full select-none z-10">
					{apps.map((app, i) => {
						return (
							<div key={i} className="w-[27%] max-sm:w-5/12 max-sm:max-w-32 rounded-2xl aspect-square text-gray-400 bg-(--clr-surface2) cursor-pointer transition border-2 border-(--clr-surface) hover:border-gray-700 flex justify-center items-center flex-col gap-2">
								{app.icon}
								{app.title}
							</div>
						);
					})}
				</div>
				<div className="w-96 aspect-square bg_anim2 rounded-full absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 blur-[250px]"></div>
			</div>
		</section>
	);
}
