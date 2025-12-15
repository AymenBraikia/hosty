import Button from "../components/button";

interface service {
	type: "Cloud VPS" | "Cloud VDS" | "Dedicated Server";
	cpu: number;
	ram: number;
	bandwidth: string;
	storage: string;
	title?: string;
	price: number;
	discount?: number;
}

const services: service[] = [
	{ type: "Cloud VPS", cpu: 2, ram: 4, bandwidth: "2 TB", storage: "50GB SSD", price: 7.99 },
	{ type: "Dedicated Server", cpu: 32, ram: 128, bandwidth: "30 TB", storage: "2TB NVMe", price: 329.99 },
	{ type: "Cloud VDS", cpu: 12, ram: 24, bandwidth: "12 TB", storage: "500GB NVMe", price: 89.99 },
	{ type: "Cloud VPS", cpu: 1, ram: 2, bandwidth: "1 TB", storage: "25GB SSD", price: 5.49 },
	{ type: "Dedicated Server", cpu: 16, ram: 64, bandwidth: "20 TB", storage: "2×480GB SSD", price: 169.99 },
	{ type: "Cloud VPS", cpu: 4, ram: 8, bandwidth: "5 TB", storage: "160GB SSD", price: 19.99 },
	{ type: "Cloud VDS", cpu: 20, ram: 48, bandwidth: "18 TB", storage: "800GB NVMe", price: 149.99 },
	{ type: "Cloud VPS", cpu: 6, ram: 8, bandwidth: "6 TB", storage: "200GB SSD", price: 24.99 },
	{ type: "Dedicated Server", cpu: 8, ram: 32, bandwidth: "12 TB", storage: "2TB HDD", price: 99.99 },
	{ type: "Cloud VDS", cpu: 16, ram: 32, bandwidth: "15 TB", storage: "640GB NVMe", price: 119.99 },
	{ type: "Cloud VPS", cpu: 12, ram: 24, bandwidth: "10 TB", storage: "320GB SSD", price: 49.99 },
	{ type: "Cloud VDS", cpu: 8, ram: 16, bandwidth: "8 TB", storage: "320GB NVMe", price: 59.99 },
	{ type: "Dedicated Server", cpu: 40, ram: 128, bandwidth: "35 TB", storage: "2×1TB NVMe", price: 299.99 },
	{ type: "Cloud VPS", cpu: 8, ram: 16, bandwidth: "8 TB", storage: "250GB SSD", price: 34.99 },
	{ type: "Cloud VDS", cpu: 24, ram: 64, bandwidth: "20 TB", storage: "1TB NVMe", price: 179.99 },
	{ type: "Dedicated Server", cpu: 24, ram: 64, bandwidth: "25 TB", storage: "2×480GB SSD", price: 199.99 },
	{ type: "Cloud VPS", cpu: 2, ram: 2, bandwidth: "2 TB", storage: "50GB SSD", price: 8.99 },
	{ type: "Cloud VPS", cpu: 1, ram: 1, bandwidth: "1 TB", storage: "25GB SSD", price: 4.99 },
	{ type: "Cloud VDS", cpu: 32, ram: 96, bandwidth: "25 TB", storage: "1.5TB NVMe", price: 249.99 },
	{ type: "Dedicated Server", cpu: 48, ram: 192, bandwidth: "40 TB", storage: "2×2TB NVMe", price: 369.99 },
	{ type: "Cloud VPS", cpu: 4, ram: 4, bandwidth: "4 TB", storage: "120GB SSD", price: 15.99 },
	{ type: "Cloud VDS", cpu: 10, ram: 20, bandwidth: "10 TB", storage: "400GB NVMe", price: 74.99 },
	{ type: "Dedicated Server", cpu: 56, ram: 256, bandwidth: "50 TB", storage: "4TB NVMe", price: 449.99 },
	{ type: "Cloud VPS", cpu: 16, ram: 32, bandwidth: "12 TB", storage: "400GB SSD", price: 69.99 },
	{ type: "Cloud VDS", cpu: 6, ram: 12, bandwidth: "6 TB", storage: "250GB NVMe", price: 49.99 },
	{ type: "Dedicated Server", cpu: 64, ram: 512, bandwidth: "60 TB", storage: "2×4TB NVMe", price: 599.99 },
	{ type: "Cloud VPS", cpu: 12, ram: 24, bandwidth: "10 TB", storage: "320GB SSD", price: 49.99 },
	{ type: "Cloud VPS", cpu: 2, ram: 4, bandwidth: "3 TB", storage: "80GB SSD", price: 11.99 },
	{ type: "Cloud VDS", cpu: 4, ram: 8, bandwidth: "5 TB", storage: "200GB NVMe", price: 39.99 },
	{ type: "Dedicated Server", cpu: 12, ram: 32, bandwidth: "15 TB", storage: "2×1TB HDD", price: 129.99 },
	{ type: "Cloud VPS", cpu: 8, ram: 16, bandwidth: "8 TB", storage: "250GB SSD", price: 34.99 },
	{ type: "Cloud VDS", cpu: 40, ram: 128, bandwidth: "30 TB", storage: "2TB NVMe", price: 329.99 },
	{ type: "Dedicated Server", cpu: 16, ram: 64, bandwidth: "20 TB", storage: "2×480GB SSD", price: 159.99, discount: 20, title: "Limited Offer" },
	{ type: "Cloud VPS", cpu: 4, ram: 8, bandwidth: "5 TB", storage: "160GB SSD", price: 17.99, discount: 15, title: "Popular Choice" },
	{ type: "Cloud VDS", cpu: 8, ram: 16, bandwidth: "8 TB", storage: "320GB NVMe", price: 54.99, discount: 10, title: "Best Value" },
	{ type: "Cloud VPS", cpu: 2, ram: 4, bandwidth: "3 TB", storage: "80GB SSD", price: 9.99, discount: 20, title: "Starter Deal" },
	{ type: "Dedicated Server", cpu: 32, ram: 128, bandwidth: "30 TB", storage: "2×960GB SSD", price: 229.99, discount: 25, title: "Enterprise Deal" },
	{ type: "Cloud VPS", cpu: 6, ram: 8, bandwidth: "6 TB", storage: "200GB SSD", price: 24.99 },
	{ type: "Cloud VDS", cpu: 12, ram: 24, bandwidth: "12 TB", storage: "500GB NVMe", price: 89.99 },
	{ type: "Dedicated Server", cpu: 40, ram: 128, bandwidth: "35 TB", storage: "2×1TB NVMe", price: 299.99 },
	{ type: "Cloud VPS", cpu: 1, ram: 2, bandwidth: "2 TB", storage: "40GB SSD", price: 6.99 },
	{ type: "Cloud VDS", cpu: 16, ram: 32, bandwidth: "15 TB", storage: "640GB NVMe", price: 119.99 },
	{ type: "Dedicated Server", cpu: 8, ram: 16, bandwidth: "10 TB", storage: "1TB HDD", price: 79.99 },
	{ type: "Cloud VPS", cpu: 4, ram: 4, bandwidth: "4 TB", storage: "120GB SSD", price: 15.99 },
	{ type: "Cloud VDS", cpu: 24, ram: 64, bandwidth: "20 TB", storage: "1TB NVMe", price: 179.99 },
	{ type: "Dedicated Server", cpu: 24, ram: 64, bandwidth: "25 TB", storage: "2×480GB SSD", price: 199.99 },
];

export default function Body() {
	return (
		<section className="w-dvw min-h-dvh flex flex-col justify-start items-start p-32">
			<h1 className="font-bold text-5xl my-2">Cloud Services & VPS</h1>
			<p className="text_shine text-xl">Deploy high-performance instances in seconds.</p>
			<div className="flex justify-center items-center w-full gap-8 flex-wrap my-10">
				{services.map((s, i) => (
					<div key={i} className="w-96 min-h-96 bg-(--clr-surface) border border-(--clr-surface-light2) rounded-2xl flex justify-center items-start flex-col p-4 gap-4">
						<h2 className="text-2xl font-black">{s.type}</h2>
						<h3 className="text-3xl font-black">
							${s.price}
							<span className="text-base text-gray-400 font-light">/mo</span>
						</h3>
						<div className="flex flex-col w-full gap-2">
							<div className="flex justify-between items-center text-gray-500 font-bold">
								CPU <span className="text-foreground font-normal">{s.cpu} vCPU</span>
							</div>
							<hr className="border-(--clr-surface-light2)" />
							<div className="flex justify-between items-center text-gray-500 font-bold">
								RAM <span className="text-foreground font-normal">{s.ram} GB</span>
							</div>
							<hr className="border-(--clr-surface-light2)" />
							<div className="flex justify-between items-center text-gray-500 font-bold">
								Storage <span className="text-foreground font-normal">{s.storage}</span>
							</div>
							<hr className="border-(--clr-surface-light2)" />
							<div className="flex justify-between items-center text-gray-500 font-bold">
								Bandwidth <span className="text-foreground font-normal">{s.bandwidth}</span>
							</div>
							<hr className="border-(--clr-surface-light2)" />
						</div>
						<Button content="Deploy Now" css="w-full deploy rounded-full" />
					</div>
				))}
			</div>
		</section>
	);
}
