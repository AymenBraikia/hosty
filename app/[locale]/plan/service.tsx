import Cpu from "../components/svg/cpu";
import Server from "../components/svg/server";
import Star from "../components/svg/star";
import Correct from "../components/svg/correct";

import AtcBtn from "../components/addToCart";
import AddWishBtn from "../components/addToWish";
import get_services from "@/lib/get_service_data";
import { domain, hostService } from "../types/product";
import { WithId } from "mongodb";

export default async function Service_display({ id, user_info }: { id: number; user_info: { wish_list: [domain | hostService]; cart: [domain | hostService]; name: string } | undefined }) {
	const data = (await get_services(id)) as WithId<hostService>;

	return data ? (
		<div className="flex justify-center items-start w-full gap-16">
			<div className="bg-(--clr-surface) relative overflow-hidden p-16 rounded-2xl border border-(--clr-surface-light2) flex flex-col justify-center items-start gap-8 w-1/2">
				{data.most_popular && (
					<>
						<div className="absolute right-0 top-0 bg_anim w-80 aspect-square rounded-full translate-x-1/2 -translate-y-1/2 blur-[250px]"></div>
						<h6 className="font-black bg-(--clr-accent-opacity) text-(--clr-accent) py-2 px-4 rounded-2xl absolute top-4 right-4 z-10">BEST VALUE</h6>
					</>
				)}
				<Server color="var(--clr-primary)" s={32} css="z-10" />
				<h2 className="text-4xl font-black z-10">{data.type}</h2>
				<p className="text_shine text-xl z-10">{data.description}</p>
				<h1 className="text-6xl font-bold z-10">
					${data.price} <span className="text-gray-500 font-medium text-3xl">/mo</span>
				</h1>
				<hr className="border-gray-600 w-full z-10" />

				<AtcBtn available={user_info!.cart.find((e) => e.id == data.id) ? false : true} product_id={data.id} />
				<AddWishBtn available={[...user_info!.wish_list, ...user_info!.cart].find((e) => e.id == data.id) ? false : true} product_id={data.id} />
			</div>
			<div className="flex flex-col justify-start items-start w-1/2 gap-4">
				<h4 className="text-2xl font-bold flex justify-start items-center gap-3">
					<Cpu color="var(--clr-primary)" s={25} /> Hardware Specifications
				</h4>
				<div className="w-full flex justify-between items-center gap-3 flex-wrap">
					<div className="w-[48%] bg-(--clr-surface) p-6 rounded-2xl border border-(--clr-surface-light2) hover:border-(--clr-primary) transition">
						<h6 className="font-bold text-gray-500">PROCESSING</h6>
						<h6 className="font-black text-xl">{data.specs.cpu} vCPU</h6>
					</div>
					<div className="w-[48%] bg-(--clr-surface) p-6 rounded-2xl border border-(--clr-surface-light2) hover:border-(--clr-primary) transition">
						<h6 className="font-bold text-gray-500">MEMORY</h6>
						<h6 className="font-black text-xl">{data.specs.ram} GB</h6>
					</div>
					<div className="w-[48%] bg-(--clr-surface) p-6 rounded-2xl border border-(--clr-surface-light2) hover:border-(--clr-primary) transition">
						<h6 className="font-bold text-gray-500">STORAGE</h6>
						<h6 className="font-black text-xl">{data.specs.storage}</h6>
					</div>
					<div className="w-[48%] bg-(--clr-surface) p-6 rounded-2xl border border-(--clr-surface-light2) hover:border-(--clr-primary) transition">
						<h6 className="font-bold text-gray-500">NETWORK</h6>
						<h6 className="font-black text-xl">{data.specs.bandwidth}</h6>
					</div>
				</div>
				<h4 className="text-2xl font-bold flex justify-start items-center gap-3">
					<Star color="var(--clr-accent)" s={25} /> Included Features
				</h4>

				<div className="flex justify-start items-center gap-3 w-full p-3 bg-(--clr-surface) rounded-2xl border border-(--clr-surface-light2)">
					<div className="bg-[#22c55e24] rounded-full w-8 aspect-square flex justify-center items-center">
						<Correct s={17} color="#22c55e" />
					</div>
					Full Root Access
				</div>

				<div className="flex justify-start items-center gap-3 w-full p-3 bg-(--clr-surface) rounded-2xl border border-(--clr-surface-light2)">
					<div className="bg-[#22c55e24] rounded-full w-8 aspect-square flex justify-center items-center">
						<Correct s={17} color="#22c55e" />
					</div>
					Dedicated IPv4
				</div>

				<div className="flex justify-start items-center gap-3 w-full p-3 bg-(--clr-surface) rounded-2xl border border-(--clr-surface-light2)">
					<div className="bg-[#22c55e24] rounded-full w-8 aspect-square flex justify-center items-center">
						<Correct s={17} color="#22c55e" />
					</div>
					Daily Automated Backups
				</div>

				<div className="flex justify-start items-center gap-3 w-full p-3 bg-(--clr-surface) rounded-2xl border border-(--clr-surface-light2)">
					<div className="bg-[#22c55e24] rounded-full w-8 aspect-square flex justify-center items-center">
						<Correct s={17} color="#22c55e" />
					</div>
					Free CDN Integration
				</div>

				<div className="flex justify-start items-center gap-3 w-full p-3 bg-(--clr-surface) rounded-2xl border border-(--clr-surface-light2)">
					<div className="bg-[#22c55e24] rounded-full w-8 aspect-square flex justify-center items-center">
						<Correct s={17} color="#22c55e" />
					</div>
					Snapshot Support
				</div>

				<div className="flex justify-start items-center gap-3 w-full p-3 bg-(--clr-surface) rounded-2xl border border-(--clr-surface-light2)">
					<div className="bg-[#22c55e24] rounded-full w-8 aspect-square flex justify-center items-center">
						<Correct s={17} color="#22c55e" />
					</div>
					Unlimited Bandwidth
				</div>

				<div className="flex justify-start items-center gap-3 w-full p-3 bg-(--clr-surface) rounded-2xl border border-(--clr-surface-light2)">
					<div className="bg-[#22c55e24] rounded-full w-8 aspect-square flex justify-center items-center">
						<Correct s={17} color="#22c55e" />
					</div>
					API Access
				</div>

				<div className="flex justify-start items-center gap-3 w-full p-3 bg-(--clr-surface) rounded-2xl border border-(--clr-surface-light2)">
					<div className="bg-[#22c55e24] rounded-full w-8 aspect-square flex justify-center items-center">
						<Correct s={17} color="#22c55e" />
					</div>
					24/7 Support
				</div>

				<div className="flex justify-start items-center gap-3 w-full p-3 bg-(--clr-surface) rounded-2xl border border-(--clr-surface-light2)">
					<div className="bg-[#22c55e24] rounded-full w-8 aspect-square flex justify-center items-center">
						<Correct s={17} color="#22c55e" />
					</div>
					99.9% Uptime Guarantee
				</div>

				<div className="flex justify-start items-center gap-3 w-full p-3 bg-(--clr-surface) rounded-2xl border border-(--clr-surface-light2)">
					<div className="bg-[#22c55e24] rounded-full w-8 aspect-square flex justify-center items-center">
						<Correct s={17} color="#22c55e" />
					</div>
					Cloud Firewall
				</div>
			</div>
		</div>
	) : (
		<div>data is not defined</div>
	);
}
