import { hostService } from "@/app/[locale]/types/product";
import { client } from "./db";

const collection = client.db("hosty").collection("services");
let id = -Infinity;

export default async function add_services(service: hostService | hostService[]) {
	console.clear();
	console.log("preparing to insert the services...");

	for (const s of await collection.find({}).toArray()) if (s.id > id) id = s.id;

	if (typeof service === "object" && !Array.isArray(service)) {
		id++;
		service.id = id;
	} else if (Array.isArray(service)) {
		for (let i = 0; i < service.length; i++) {
			id++;
			service[i].id = id;
		}
	}

	if (typeof service === "object" && !Array.isArray(service)) return collection.insertOne(service);
	else if (Array.isArray(service)) return collection.insertMany(service);
	else return null;
}

let i = 0;

const services: hostService[] = [
	{
		type: "Cloud VPS",
		id: i++,
		specs: { cpu: 1, ram: 1, bandwidth: "1 TB", storage: "25GB SSD" },
		price: 4.99,
		description: "Entry-level sandbox environment perfect for personal blogs, VPNs, or lightweight testing. Features instant provisioning.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		specs: { cpu: 1, ram: 2, bandwidth: "1 TB", storage: "25GB SSD" },
		price: 5.49,
		description: "Cost-effective solution with expanded memory, designed for low-traffic websites and micro-services.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		specs: { cpu: 1, ram: 2, bandwidth: "2 TB", storage: "40GB SSD" },
		price: 6.99,
		description: "Enhanced storage capability for content-rich sites. Runs on our high-availability cloud infrastructure.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		specs: { cpu: 2, ram: 4, bandwidth: "2 TB", storage: "50GB SSD" },
		price: 7.99,
		description: "Multi-core processing power suitable for small e-commerce stores and moderately active databases.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		specs: { cpu: 2, ram: 2, bandwidth: "2 TB", storage: "50GB SSD" },
		price: 8.99,
		description: "Balanced CPU performance for computational tasks requiring consistent processing speeds.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		specs: { cpu: 2, ram: 4, bandwidth: "3 TB", storage: "80GB SSD" },
		price: 9.99,
		discount: 20,
		badge: "Starter Deal",
		description: "Our Starter Deal offers the perfect launchpad for growing businesses, combining generous SSD space with reliable throughput.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		specs: { cpu: 2, ram: 4, bandwidth: "3 TB", storage: "80GB SSD" },
		price: 11.99,
		description: "Standard production tier offering a robust environment for web hosting and development pipelines.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		specs: { cpu: 4, ram: 4, bandwidth: "4 TB", storage: "120GB SSD" },
		price: 15.99,
		description: "Quad-core performance designed to handle spikes in traffic and concurrent user sessions effortlessly.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		specs: { cpu: 4, ram: 4, bandwidth: "4 TB", storage: "120GB SSD" },
		price: 15.99,
		description: "Reliable hosting solution with redundant storage, ideal for media streaming or file repository servers.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		specs: { cpu: 4, ram: 8, bandwidth: "5 TB", storage: "160GB SSD" },
		price: 17.99,
		discount: 15,
		badge: "Popular Choice",
		description: "A customer favorite balancing RAM and CPU. Perfect for CMS platforms like WordPress or Magento with heavy plugins.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		specs: { cpu: 4, ram: 8, bandwidth: "5 TB", storage: "160GB SSD" },
		price: 19.99,
		description: "Our best-selling configuration. Provides ample resources for scaling applications without performance bottlenecks.",
		most_popular: true,
	},
	{
		type: "Cloud VPS",
		id: i++,
		specs: { cpu: 6, ram: 8, bandwidth: "6 TB", storage: "200GB SSD" },
		price: 24.99,
		description: "High-performance tier for data-intensive operations. Includes automated backups and DDoS protection.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		specs: { cpu: 6, ram: 8, bandwidth: "6 TB", storage: "200GB SSD" },
		price: 24.99,
		description: "Optimized for backend API services, offering low-latency connectivity and high storage I/O.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		specs: { cpu: 8, ram: 16, bandwidth: "8 TB", storage: "250GB SSD" },
		price: 34.99,
		description: "Powerhouse VPS for demanding workloads. Ideal for game servers, large databases, and enterprise apps.",
		most_popular: true,
	},
	{
		type: "Cloud VPS",
		id: i++,
		specs: { cpu: 8, ram: 16, bandwidth: "8 TB", storage: "250GB SSD" },
		price: 34.99,
		description: "Enterprise-grade virtualization delivering consistent performance for mission-critical deployments.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		specs: { cpu: 12, ram: 24, bandwidth: "10 TB", storage: "320GB SSD" },
		price: 49.99,
		description: "Massive parallel processing capabilities for big data analysis and complex rendering tasks.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		specs: { cpu: 12, ram: 24, bandwidth: "10 TB", storage: "320GB SSD" },
		price: 49.99,
		description: "Designed for resellers and agencies needing to host multiple clients on a single, powerful instance.",
	},
	{
		type: "Cloud VPS",
		id: i++,
		specs: { cpu: 16, ram: 32, bandwidth: "12 TB", storage: "400GB SSD" },
		price: 69.99,
		description: "The ultimate VPS solution. Replaces small dedicated servers with the flexibility of cloud scalability.",
	},

	// =====================
	// Cloud VDS (by price)
	// =====================
	{
		type: "Cloud VDS",
		id: i++,
		specs: { cpu: 4, ram: 8, bandwidth: "5 TB", storage: "200GB NVMe" },
		price: 39.99,
		description: "Dedicated CPU threads and NVMe storage ensure zero steal time and lightning-fast disk access.",
	},
	{
		type: "Cloud VDS",
		id: i++,
		specs: { cpu: 6, ram: 12, bandwidth: "6 TB", storage: "250GB NVMe" },
		price: 49.99,
		description: "Isolated resources on KVM virtualization, providing the stability required for production environments.",
	},
	{
		type: "Cloud VDS",
		id: i++,
		specs: { cpu: 8, ram: 16, bandwidth: "8 TB", storage: "320GB NVMe" },
		price: 54.99,
		discount: 10,
		badge: "Best Value",
		description: "Unbeatable price-to-performance ratio. Dedicated hardware resources without the management overhead.",
	},
	{
		type: "Cloud VDS",
		id: i++,
		specs: { cpu: 8, ram: 16, bandwidth: "8 TB", storage: "320GB NVMe" },
		price: 59.99,
		description: "Top-tier VDS choice for high-traffic portals. Guaranteed allocation ensures your neighbors never impact your speed.",
		most_popular: true,
	},
	{
		type: "Cloud VDS",
		id: i++,
		specs: { cpu: 10, ram: 20, bandwidth: "10 TB", storage: "400GB NVMe" },
		price: 74.99,
		description: "Bridge the gap between VPS and Dedicated. High-frequency computing for CI/CD pipelines and compilation.",
	},
	{
		type: "Cloud VDS",
		id: i++,
		specs: { cpu: 12, ram: 24, bandwidth: "12 TB", storage: "500GB NVMe" },
		price: 89.99,
		description: "Half-terabyte of ultra-fast NVMe storage coupled with dedicated cores for I/O heavy applications.",
	},
	{
		type: "Cloud VDS",
		id: i++,
		specs: { cpu: 12, ram: 24, bandwidth: "12 TB", storage: "500GB NVMe" },
		price: 89.99,
		description: "Secure, single-tenant environment ideal for financial applications or sensitive data processing.",
	},
	{
		type: "Cloud VDS",
		id: i++,
		specs: { cpu: 16, ram: 32, bandwidth: "15 TB", storage: "640GB NVMe" },
		price: 119.99,
		description: "Heavy-duty VDS capable of sustaining thousands of concurrent connections. Includes premium network routing.",
		most_popular: true,
	},
	{
		type: "Cloud VDS",
		id: i++,
		specs: { cpu: 16, ram: 32, bandwidth: "15 TB", storage: "640GB NVMe" },
		price: 119.99,
		description: "Enterprise infrastructure configured for maximum reliability. 99.99% SLA guaranteed.",
	},
	{
		type: "Cloud VDS",
		id: i++,
		specs: { cpu: 20, ram: 48, bandwidth: "18 TB", storage: "800GB NVMe" },
		price: 149.99,
		description: "Extreme performance tier with massive RAM allocation for in-memory caching (Redis/Memcached) and databases.",
	},
	{
		type: "Cloud VDS",
		id: i++,
		specs: { cpu: 24, ram: 64, bandwidth: "20 TB", storage: "1TB NVMe" },
		price: 179.99,
		description: "Server-grade power with 1TB of NVMe. Perfect for SaaS providers needing scalable, dedicated architecture.",
	},
	{
		type: "Cloud VDS",
		id: i++,
		specs: { cpu: 24, ram: 64, bandwidth: "20 TB", storage: "1TB NVMe" },
		price: 179.99,
		description: "Deployed in Tier IV data centers with redundant power and networking for failsafe operations.",
	},
	{
		type: "Cloud VDS",
		id: i++,
		specs: { cpu: 32, ram: 96, bandwidth: "25 TB", storage: "1.5TB NVMe" },
		price: 249.99,
		description: "A monster VDS for virtualization enthusiasts. Run multiple nested VMs or containers with ease.",
	},
	{
		type: "Cloud VDS",
		id: i++,
		specs: { cpu: 40, ram: 128, bandwidth: "30 TB", storage: "2TB NVMe" },
		price: 329.99,
		description: "Our highest VDS tier. Equivalent to a powerful dedicated server but with the flexibility of the cloud.",
	},

	// =========================
	// Dedicated Server (by price)
	// =========================
	{
		type: "Dedicated Server",
		id: i++,
		specs: { cpu: 8, ram: 16, bandwidth: "10 TB", storage: "1TB HDD" },
		price: 79.99,
		description: "Bare metal control at an entry-level price. High capacity HDD storage suitable for backup and archival.",
	},
	{
		type: "Dedicated Server",
		id: i++,
		specs: { cpu: 8, ram: 32, bandwidth: "12 TB", storage: "2TB HDD" },
		price: 99.99,
		description: "Popular storage server. Full root access to physical hardware, ideal for private clouds and media libraries.",
		most_popular: true,
	},
	{
		type: "Dedicated Server",
		id: i++,
		specs: { cpu: 12, ram: 32, bandwidth: "15 TB", storage: "2×1TB HDD" },
		price: 129.99,
		description: "Dual-drive configuration allowing for RAID 1 setups to ensure data integrity and redundancy.",
	},
	{
		type: "Dedicated Server",
		id: i++,
		specs: { cpu: 16, ram: 64, bandwidth: "20 TB", storage: "2×480GB SSD" },
		price: 159.99,
		discount: 20,
		badge: "Limited Offer",
		description: "High-speed SSD dedicated server. Significantly faster boot and load times for application hosting.",
	},
	{
		type: "Dedicated Server",
		id: i++,
		specs: { cpu: 16, ram: 64, bandwidth: "20 TB", storage: "2×480GB SSD" },
		price: 169.99,
		description: "Robust physical infrastructure with IPMI access. Perfect for virtualization nodes (Proxmox/ESXi).",
	},
	{
		type: "Dedicated Server",
		id: i++,
		specs: { cpu: 24, ram: 64, bandwidth: "25 TB", storage: "2×480GB SSD" },
		price: 199.99,
		description: "High core-count server for parallel processing. Handles extensive background jobs and worker queues.",
	},
	{
		type: "Dedicated Server",
		id: i++,
		specs: { cpu: 24, ram: 64, bandwidth: "25 TB", storage: "2×480GB SSD" },
		price: 199.99,
		description: "Professional grade hardware with unmetered internal network, suitable for clustering.",
	},
	{
		type: "Dedicated Server",
		id: i++,
		specs: { cpu: 32, ram: 128, bandwidth: "30 TB", storage: "2×960GB SSD" },
		price: 229.99,
		discount: 25,
		badge: "Enterprise Deal",
		description: "Enterprise powerhouse with massive RAM and nearly 2TB of fast SSD storage. Built for heavy-duty production.",
	},
	{
		type: "Dedicated Server",
		id: i++,
		specs: { cpu: 40, ram: 128, bandwidth: "35 TB", storage: "2×1TB NVMe" },
		price: 299.99,
		description: "Next-gen storage performance. NVMe drives provide millions of IOPS for the most demanding databases.",
	},
	{
		type: "Dedicated Server",
		id: i++,
		specs: { cpu: 40, ram: 128, bandwidth: "35 TB", storage: "2×1TB NVMe" },
		price: 299.99,
		description: "Physically isolated hardware ensuring complete privacy and security for compliance-heavy industries.",
	},
	{
		type: "Dedicated Server",
		id: i++,
		specs: { cpu: 32, ram: 128, bandwidth: "30 TB", storage: "2TB NVMe" },
		price: 329.99,
		description: "Optimized for latency-sensitive applications. Direct hardware access with premium bandwidth routing.",
	},
	{
		type: "Dedicated Server",
		id: i++,
		specs: { cpu: 48, ram: 192, bandwidth: "40 TB", storage: "2×2TB NVMe" },
		price: 369.99,
		description: "Extreme multi-core performance. Ideal for machine learning inference, video transcoding, and scientific modeling.",
	},
	{
		type: "Dedicated Server",
		id: i++,
		specs: { cpu: 56, ram: 256, bandwidth: "50 TB", storage: "4TB NVMe" },
		price: 449.99,
		description: "Data center in a box. Massive memory and storage capacity for running entire company infrastructures.",
	},
	{
		type: "Dedicated Server",
		id: i++,
		specs: { cpu: 64, ram: 512, bandwidth: "60 TB", storage: "2×4TB NVMe" },
		price: 599.99,
		description: "The ultimate flagship server. Unmatched computational power and storage speed for top-tier enterprise needs.",
	},
];

(async () => {
	await add_services(services);
	console.log("finished inserting the services.");
})();
