"use client";
import Button from "../components/button";
import Cpu from "../components/svg/cpu";
import { useSearchParams } from "next/navigation";
import AtcBtn from "../components/addToCart";
import Server from "../components/svg/server";
import Star from "../components/svg/star";
import Correct from "../components/svg/correct";
import Arrow from "../components/svg/arrow";
import { domain, hostService } from "../types/product";
import { useContext, useState } from "react";
import user_data from "../context/user_data";
import Notification from "../components/notification";

interface service {
	type: "Cloud VPS" | "Cloud VDS" | "Dedicated Server";
	cpu: number;
	ram: number;
	bandwidth: string;
	storage: string;
	description: string;
	id: number;
	title?: string;
	price: number;
	discount?: number;
	mostPopular?: boolean;
}

let i = 0;

const services: service[] = [
	{
		type: "Cloud VPS",
		id: i++,
		cpu: 1,
		ram: 1,
		bandwidth: "1 TB",
		storage: "25GB SSD",
		price: 4.99,
		description: "Entry-level sandbox environment perfect for personal blogs, VPNs, or lightweight testing. Features instant provisioning.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		cpu: 1,
		ram: 2,
		bandwidth: "1 TB",
		storage: "25GB SSD",
		price: 5.49,
		description: "Cost-effective solution with expanded memory, designed for low-traffic websites and micro-services.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		cpu: 1,
		ram: 2,
		bandwidth: "2 TB",
		storage: "40GB SSD",
		price: 6.99,
		description: "Enhanced storage capability for content-rich sites. Runs on our high-availability cloud infrastructure.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		cpu: 2,
		ram: 4,
		bandwidth: "2 TB",
		storage: "50GB SSD",
		price: 7.99,
		description: "Multi-core processing power suitable for small e-commerce stores and moderately active databases.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		cpu: 2,
		ram: 2,
		bandwidth: "2 TB",
		storage: "50GB SSD",
		price: 8.99,
		description: "Balanced CPU performance for computational tasks requiring consistent processing speeds.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		cpu: 2,
		ram: 4,
		bandwidth: "3 TB",
		storage: "80GB SSD",
		price: 9.99,
		discount: 20,
		title: "Starter Deal",
		description: "Our Starter Deal offers the perfect launchpad for growing businesses, combining generous SSD space with reliable throughput.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		cpu: 2,
		ram: 4,
		bandwidth: "3 TB",
		storage: "80GB SSD",
		price: 11.99,
		description: "Standard production tier offering a robust environment for web hosting and development pipelines.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		cpu: 4,
		ram: 4,
		bandwidth: "4 TB",
		storage: "120GB SSD",
		price: 15.99,
		description: "Quad-core performance designed to handle spikes in traffic and concurrent user sessions effortlessly.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		cpu: 4,
		ram: 4,
		bandwidth: "4 TB",
		storage: "120GB SSD",
		price: 15.99,
		description: "Reliable hosting solution with redundant storage, ideal for media streaming or file repository servers.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		cpu: 4,
		ram: 8,
		bandwidth: "5 TB",
		storage: "160GB SSD",
		price: 17.99,
		discount: 15,
		title: "Popular Choice",
		description: "A customer favorite balancing RAM and CPU. Perfect for CMS platforms like WordPress or Magento with heavy plugins.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		cpu: 4,
		ram: 8,
		bandwidth: "5 TB",
		storage: "160GB SSD",
		price: 19.99,
		mostPopular: true,
		description: "Our best-selling configuration. Provides ample resources for scaling applications without performance bottlenecks.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		cpu: 6,
		ram: 8,
		bandwidth: "6 TB",
		storage: "200GB SSD",
		price: 24.99,
		description: "High-performance tier for data-intensive operations. Includes automated backups and DDoS protection.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		cpu: 6,
		ram: 8,
		bandwidth: "6 TB",
		storage: "200GB SSD",
		price: 24.99,
		description: "Optimized for backend API services, offering low-latency connectivity and high storage I/O.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		cpu: 8,
		ram: 16,
		bandwidth: "8 TB",
		storage: "250GB SSD",
		price: 34.99,
		mostPopular: true,
		description: "Powerhouse VPS for demanding workloads. Ideal for game servers, large databases, and enterprise apps.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		cpu: 8,
		ram: 16,
		bandwidth: "8 TB",
		storage: "250GB SSD",
		price: 34.99,
		description: "Enterprise-grade virtualization delivering consistent performance for mission-critical deployments.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		cpu: 12,
		ram: 24,
		bandwidth: "10 TB",
		storage: "320GB SSD",
		price: 49.99,
		description: "Massive parallel processing capabilities for big data analysis and complex rendering tasks.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		cpu: 12,
		ram: 24,
		bandwidth: "10 TB",
		storage: "320GB SSD",
		price: 49.99,
		description: "Designed for resellers and agencies needing to host multiple clients on a single, powerful instance.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		cpu: 16,
		ram: 32,
		bandwidth: "12 TB",
		storage: "400GB SSD",
		price: 69.99,
		description: "The ultimate VPS solution. Replaces small dedicated servers with the flexibility of cloud scalability.",
	},

	// =====================
	// Cloud VDS (by price)
	// =====================
	{
		type: "Cloud VDS",
		id: i++,
		cpu: 4,
		ram: 8,
		bandwidth: "5 TB",
		storage: "200GB NVMe",
		price: 39.99,
		description: "Dedicated CPU threads and NVMe storage ensure zero steal time and lightning-fast disk access.",
	},
	{
		type: "Cloud VDS",
		id: i++,
		cpu: 6,
		ram: 12,
		bandwidth: "6 TB",
		storage: "250GB NVMe",
		price: 49.99,
		description: "Isolated resources on KVM virtualization, providing the stability required for production environments.",
	},
	{
		type: "Cloud VDS",
		id: i++,
		cpu: 8,
		ram: 16,
		bandwidth: "8 TB",
		storage: "320GB NVMe",
		price: 54.99,
		discount: 10,
		title: "Best Value",
		description: "Unbeatable price-to-performance ratio. Dedicated hardware resources without the management overhead.",
	},
	{
		type: "Cloud VDS",
		id: i++,
		cpu: 8,
		ram: 16,
		bandwidth: "8 TB",
		storage: "320GB NVMe",
		price: 59.99,
		mostPopular: true,
		description: "Top-tier VDS choice for high-traffic portals. Guaranteed allocation ensures your neighbors never impact your speed.",
	},
	{
		type: "Cloud VDS",
		id: i++,
		cpu: 10,
		ram: 20,
		bandwidth: "10 TB",
		storage: "400GB NVMe",
		price: 74.99,
		description: "Bridge the gap between VPS and Dedicated. High-frequency computing for CI/CD pipelines and compilation.",
	},
	{
		type: "Cloud VDS",
		id: i++,
		cpu: 12,
		ram: 24,
		bandwidth: "12 TB",
		storage: "500GB NVMe",
		price: 89.99,
		description: "Half-terabyte of ultra-fast NVMe storage coupled with dedicated cores for I/O heavy applications.",
	},
	{
		type: "Cloud VDS",
		id: i++,
		cpu: 12,
		ram: 24,
		bandwidth: "12 TB",
		storage: "500GB NVMe",
		price: 89.99,
		description: "Secure, single-tenant environment ideal for financial applications or sensitive data processing.",
	},
	{
		type: "Cloud VDS",
		id: i++,
		cpu: 16,
		ram: 32,
		bandwidth: "15 TB",
		storage: "640GB NVMe",
		price: 119.99,
		mostPopular: true,
		description: "Heavy-duty VDS capable of sustaining thousands of concurrent connections. Includes premium network routing.",
	},
	{
		type: "Cloud VDS",
		id: i++,
		cpu: 16,
		ram: 32,
		bandwidth: "15 TB",
		storage: "640GB NVMe",
		price: 119.99,
		description: "Enterprise infrastructure configured for maximum reliability. 99.99% SLA guaranteed.",
	},
	{
		type: "Cloud VDS",
		id: i++,
		cpu: 20,
		ram: 48,
		bandwidth: "18 TB",
		storage: "800GB NVMe",
		price: 149.99,
		description: "Extreme performance tier with massive RAM allocation for in-memory caching (Redis/Memcached) and databases.",
	},
	{
		type: "Cloud VDS",
		id: i++,
		cpu: 24,
		ram: 64,
		bandwidth: "20 TB",
		storage: "1TB NVMe",
		price: 179.99,
		description: "Server-grade power with 1TB of NVMe. Perfect for SaaS providers needing scalable, dedicated architecture.",
	},
	{
		type: "Cloud VDS",
		id: i++,
		cpu: 24,
		ram: 64,
		bandwidth: "20 TB",
		storage: "1TB NVMe",
		price: 179.99,
		description: "Deployed in Tier IV data centers with redundant power and networking for failsafe operations.",
	},
	{
		type: "Cloud VDS",
		id: i++,
		cpu: 32,
		ram: 96,
		bandwidth: "25 TB",
		storage: "1.5TB NVMe",
		price: 249.99,
		description: "A monster VDS for virtualization enthusiasts. Run multiple nested VMs or containers with ease.",
	},
	{
		type: "Cloud VDS",
		id: i++,
		cpu: 40,
		ram: 128,
		bandwidth: "30 TB",
		storage: "2TB NVMe",
		price: 329.99,
		description: "Our highest VDS tier. Equivalent to a powerful dedicated server but with the flexibility of the cloud.",
	},

	// =========================
	// Dedicated Server (by price)
	// =========================
	{
		type: "Dedicated Server",
		id: i++,
		cpu: 8,
		ram: 16,
		bandwidth: "10 TB",
		storage: "1TB HDD",
		price: 79.99,
		description: "Bare metal control at an entry-level price. High capacity HDD storage suitable for backup and archival.",
	},
	{
		type: "Dedicated Server",
		id: i++,
		cpu: 8,
		ram: 32,
		bandwidth: "12 TB",
		storage: "2TB HDD",
		price: 99.99,
		mostPopular: true,
		description: "Popular storage server. Full root access to physical hardware, ideal for private clouds and media libraries.",
	},
	{
		type: "Dedicated Server",
		id: i++,
		cpu: 12,
		ram: 32,
		bandwidth: "15 TB",
		storage: "2×1TB HDD",
		price: 129.99,
		description: "Dual-drive configuration allowing for RAID 1 setups to ensure data integrity and redundancy.",
	},
	{
		type: "Dedicated Server",
		id: i++,
		cpu: 16,
		ram: 64,
		bandwidth: "20 TB",
		storage: "2×480GB SSD",
		price: 159.99,
		discount: 20,
		title: "Limited Offer",
		description: "High-speed SSD dedicated server. Significantly faster boot and load times for application hosting.",
	},
	{
		type: "Dedicated Server",
		id: i++,
		cpu: 16,
		ram: 64,
		bandwidth: "20 TB",
		storage: "2×480GB SSD",
		price: 169.99,
		description: "Robust physical infrastructure with IPMI access. Perfect for virtualization nodes (Proxmox/ESXi).",
	},
	{
		type: "Dedicated Server",
		id: i++,
		cpu: 24,
		ram: 64,
		bandwidth: "25 TB",
		storage: "2×480GB SSD",
		price: 199.99,
		description: "High core-count server for parallel processing. Handles extensive background jobs and worker queues.",
	},
	{
		type: "Dedicated Server",
		id: i++,
		cpu: 24,
		ram: 64,
		bandwidth: "25 TB",
		storage: "2×480GB SSD",
		price: 199.99,
		description: "Professional grade hardware with unmetered internal network, suitable for clustering.",
	},
	{
		type: "Dedicated Server",
		id: i++,
		cpu: 32,
		ram: 128,
		bandwidth: "30 TB",
		storage: "2×960GB SSD",
		price: 229.99,
		discount: 25,
		title: "Enterprise Deal",
		description: "Enterprise powerhouse with massive RAM and nearly 2TB of fast SSD storage. Built for heavy-duty production.",
	},
	{
		type: "Dedicated Server",
		id: i++,
		cpu: 40,
		ram: 128,
		bandwidth: "35 TB",
		storage: "2×1TB NVMe",
		price: 299.99,
		description: "Next-gen storage performance. NVMe drives provide millions of IOPS for the most demanding databases.",
	},
	{
		type: "Dedicated Server",
		id: i++,
		cpu: 40,
		ram: 128,
		bandwidth: "35 TB",
		storage: "2×1TB NVMe",
		price: 299.99,
		description: "Physically isolated hardware ensuring complete privacy and security for compliance-heavy industries.",
	},
	{
		type: "Dedicated Server",
		id: i++,
		cpu: 32,
		ram: 128,
		bandwidth: "30 TB",
		storage: "2TB NVMe",
		price: 329.99,
		description: "Optimized for latency-sensitive applications. Direct hardware access with premium bandwidth routing.",
	},
	{
		type: "Dedicated Server",
		id: i++,
		cpu: 48,
		ram: 192,
		bandwidth: "40 TB",
		storage: "2×2TB NVMe",
		price: 369.99,
		description: "Extreme multi-core performance. Ideal for machine learning inference, video transcoding, and scientific modeling.",
	},
	{
		type: "Dedicated Server",
		id: i++,
		cpu: 56,
		ram: 256,
		bandwidth: "50 TB",
		storage: "4TB NVMe",
		price: 449.99,
		description: "Data center in a box. Massive memory and storage capacity for running entire company infrastructures.",
	},
	{
		type: "Dedicated Server",
		id: i++,
		cpu: 64,
		ram: 512,
		bandwidth: "60 TB",
		storage: "2×4TB NVMe",
		price: 599.99,
		description: "The ultimate flagship server. Unmatched computational power and storage speed for top-tier enterprise needs.",
	},
];

export default function Body() {
	const searchParams = useSearchParams();
	const id = searchParams.get("id");

	const data = services.find((s) => s.id == Number(id));
	const user_info = useContext(user_data) as { wish_list: [domain | hostService]; cart: [domain | hostService]; name: string } | undefined;

	const [notification_visibility, set_notification_visibility] = useState<boolean>(false);
	const [notification_err, set_notification_err] = useState<string>("");

	return (
		<section className="w-dvw min-h-dvh flex flex-col justify-start items-start p-32">
			<Button url="/hosting" content="Back to Services" css="text-gray-400 hover:text-foreground flex flex-row-reverse gap-1 justify-start items-center mb-8" children_el={<Arrow s={25} css="rotate-180" color="currentColor" />} />
			<div className="flex justify-center items-start w-full gap-16">
				<div className="bg-(--clr-surface) relative overflow-hidden p-16 rounded-2xl border border-(--clr-surface-light2) flex flex-col justify-center items-start gap-8 w-1/2">
					{data?.mostPopular && (
						<>
							<div className="absolute right-0 top-0 bg_anim w-80 aspect-square rounded-full translate-x-1/2 -translate-y-1/2 blur-[250px]"></div>
							<h6 className="font-black bg-(--clr-accent-opacity) text-(--clr-accent) py-2 px-4 rounded-2xl absolute top-4 right-4 z-10">BEST VALUE</h6>
						</>
					)}
					<Server color="var(--clr-primary)" s={32} css="z-10" />
					<h2 className="text-4xl font-black z-10">{data?.type}</h2>
					<p className="text_shine text-xl z-10">{data?.description}</p>
					<h1 className="text-6xl font-bold z-10">
						${data?.price} <span className="text-gray-500 font-medium text-3xl">/mo</span>
					</h1>
					<hr className="border-gray-600 w-full z-10" />

					<AtcBtn notification_State={set_notification_visibility} notification_Err={set_notification_err} available={user_info?.cart.find((e) => e.id == data?.id) ? false : true} product_id={data?.id} />
				</div>
				<div className="flex flex-col justify-start items-start w-1/2 gap-4">
					<h4 className="text-2xl font-bold flex justify-start items-center gap-3">
						<Cpu color="var(--clr-primary)" s={25} /> Hardware Specifications
					</h4>
					<div className="w-full flex justify-between items-center gap-3 flex-wrap">
						<div className="w-[48%] bg-(--clr-surface) p-6 rounded-2xl border border-(--clr-surface-light2) hover:border-(--clr-primary) transition">
							<h6 className="font-bold text-gray-500">PROCESSING</h6>
							<h6 className="font-black text-xl">{data?.cpu} vCPU</h6>
						</div>
						<div className="w-[48%] bg-(--clr-surface) p-6 rounded-2xl border border-(--clr-surface-light2) hover:border-(--clr-primary) transition">
							<h6 className="font-bold text-gray-500">MEMORY</h6>
							<h6 className="font-black text-xl">{data?.ram} GB</h6>
						</div>
						<div className="w-[48%] bg-(--clr-surface) p-6 rounded-2xl border border-(--clr-surface-light2) hover:border-(--clr-primary) transition">
							<h6 className="font-bold text-gray-500">STORAGE</h6>
							<h6 className="font-black text-xl">{data?.storage}</h6>
						</div>
						<div className="w-[48%] bg-(--clr-surface) p-6 rounded-2xl border border-(--clr-surface-light2) hover:border-(--clr-primary) transition">
							<h6 className="font-bold text-gray-500">NETWORK</h6>
							<h6 className="font-black text-xl">{data?.bandwidth}</h6>
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
			<Notification err={notification_err} notification_visible={notification_visibility} />
		</section>
	);
}
