import { hostService } from "@/app/[locale]/types/product";
import clientPromise from "@/lib/db";
const client = await clientPromise;

const collection = client.db("hosty").collection("services");
let id = 0;

export default async function add_services(service: hostService | hostService[]) {
	console.clear();
	console.log("deleting old services...");
	await collection.deleteMany({});

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

function gen_random_ip(): string {
	let result = "";
	result += Math.floor(Math.random() * 255) + ".";
	result += Math.floor(Math.random() * 255) + ".";
	result += Math.floor(Math.random() * 255) + ".";
	result += Math.floor(Math.random() * 255);
	return result;
}

type osList = "Ubuntu 18.04" | "Ubuntu 20.04" | "Ubuntu 22.04" | "Ubuntu 24.04" | "Debian 10" | "Debian 11" | "Debian 12" | "Windows Server 2012" | "Windows Server 2016" | "Windows Server 2019" | "Windows Server 2022" | "Windows Server 2025";

function get_os(): osList {
	const possible_os: osList[] = [
		"Ubuntu 18.04",
		"Ubuntu 20.04",
		"Ubuntu 22.04",
		"Ubuntu 24.04",
		"Debian 10",
		"Debian 11",
		"Debian 12",
		"Windows Server 2012",
		"Windows Server 2016",
		"Windows Server 2019",
		"Windows Server 2022",
		"Windows Server 2025",
	];

	return possible_os[Math.floor(Math.random() * possible_os.length)];
}

// Global iterator matching your original array format
let i = 0;
const services: hostService[] = [];

// ============================================================================
// 1. CLOUD VPS: 200 Services (From Ultra-Budget Nano Plans to Pro Environments)
// ============================================================================
for (let chunk = 0; chunk < 200; chunk++) {
	let ram: number;
	let storage: string;
	let cpu: number;
	let price: number;
	let desc: string;

	if (chunk < 40) {
		// Ultra-Budget Tiers (Perfect for students, hobbies, tiny scripts, lightweight proxies)
		cpu = 1;
		ram = chunk < 10 ? 0.128 : chunk < 20 ? 0.256 : chunk < 30 ? 0.512 : 1;
		storage = `${5 + (chunk % 5) * 3}GB SSD`; // Micro storage range: 5GB to 17GB
		price = parseFloat((0.99 + chunk * 0.1).toFixed(2)); // Plans starting at just $0.99
		desc = "Nano-virtualization cell optimized for minimal crontabs, single lightweight proxy nodes, or sandboxed CLI testing.";
	} else if (chunk < 140) {
		// Balanced Mid-Tier (For average daily workloads and standard web apps)
		cpu = 1 + Math.floor((chunk - 40) / 35); // 1 to 3 Cores
		ram = 2 + (chunk % 4) * 2; // 2GB, 4GB, 6GB, 8GB
		storage = `${20 + (chunk % 6) * 12}GB SSD`; // Highly granular: 20GB up to 80GB SSD
		price = parseFloat((4.99 + (chunk - 40) * 0.2).toFixed(2));
		desc = "Standard virtual production tier balancing efficient solid-state file storage with dedicated core infrastructure.";
	} else {
		// Premium VPS Tier (For professional testing, heavy builds, active development APIs)
		cpu = 4 + Math.floor((chunk - 140) / 20); // 4 to 6 Cores
		ram = 12 + (chunk % 3) * 4; // 12GB, 16GB, 20GB
		storage = `${90 + (chunk % 5) * 25}GB SSD`; // 90GB up to 190GB SSD
		price = parseFloat((24.99 + (chunk - 140) * 0.45).toFixed(2));
		desc = "Advanced high-tier compute node designed to manage concurrent API endpoints, background worker pipelines, and active databases.";
	}

	const item: hostService = {
		type: "Cloud VPS",
		id: i++,
		specs: { cpu, ram, bandwidth: `${500 + chunk * 30}GB`, storage },
		price,
		description: desc,
		active: true,
		usage: Math.floor(Math.random() * 100),
		available: true,
		ip: gen_random_ip(),
		users: [],
		traffic: [],
		os: get_os(),
	};

	// Mark specific sweet spots for marketing visual badges
	if (chunk === 0) item.badge = "Free Trial Available";
	if (chunk === 45) {
		item.most_popular = true;
		item.badge = "Best Budget Value";
	}

	services.push(item);
}

// ============================================================================
// 2. CLOUD VDS: 150 Services (Dedicated Performance with Scaled Storage Slices)
// ============================================================================
for (let chunk = 0; chunk < 150; chunk++) {
	// Focuses on strong performance variables without forcing high disk packages on customers
	const cpu = 2 + Math.floor(chunk / 20); // 2 to 9 Dedicated Cores
	const ram = 4 + (chunk % 6) * 4; // Dedicated RAM blocks: 4GB up to 24GB
	const storage = `${30 + (chunk % 10) * 15}GB NVMe`; // Highly responsive but cost-saving storage footprint: 30GB to 165GB NVMe
	const price = parseFloat((29.99 + chunk * 1.1).toFixed(2));

	const item: hostService = {
		type: "Cloud VDS",
		id: i++,
		specs: { cpu, ram, bandwidth: `${2 + Math.floor(chunk / 12)}TB`, storage },
		price,
		description: `Dedicated performance slice environment #${chunk + 1}. Features isolated bare-metal hypervisor kernels and absolute physical resource priority.`,
		active: true,
		usage: Math.floor(Math.random() * 100),
		available: true,
		ip: gen_random_ip(),
		users: [],
		traffic: [],
		os: get_os(),
	};

	if (chunk === 25) {
		item.badge = "Developer Choice";
		item.most_popular = true;
	}

	services.push(item);
}

// ============================================================================
// 3. DEDICATED SERVERS: 100 Services (High-Performance Bare Metal Architecture)
// ============================================================================
for (let chunk = 0; chunk < 100; chunk++) {
	const cpu = 4 + (chunk % 8) * 8; // Physical infrastructure scaling from 4 to 60 hardware cores
	const ram = 16 + (chunk % 5) * 32; // Memory capacities moving smoothly from 16GB to 144GB RAM

	// Intentionally balanced storage logic so purchasers don't always overpay for gigantic storage allocations
	const storage =
		chunk % 2 === 0
			? `${120 + (chunk % 4) * 120}GB NVMe Enterprise` // Low volume, blazing fast setups: 120GB to 480GB NVMe
			: `${1 + Math.floor(chunk / 25)}TB Enterprise HDD`; // Industrial storage footprints for data heavy environments: 1TB to 4TB HDD

	const price = parseFloat((69.99 + chunk * 4.25).toFixed(2));

	const item: hostService = {
		type: "Dedicated Server",
		id: i++,
		specs: { cpu, ram, bandwidth: `${10 + chunk}TB`, storage },
		price,
		description: `Isolated physical bare metal custom production rack configuration #${chunk + 1}. Unrestricted hardware hypervisor management profiles.`,
		active: true,
		usage: Math.floor(Math.random() * 100),
		available: Math.random() > 0.03, // Realistically mocks random hardware tier stock availability
		ip: gen_random_ip(),
		users: [],
		traffic: [],
		os: get_os(),
	};

	if (chunk > 85) item.badge = "Enterprise Enterprise Tier";
	services.push(item);
}

// Execute the final collection injection
(async () => {
	await add_services(services);
	console.log(`Successfully finished processing and inserting ${services.length} inclusive service configurations.`);
	process.exit(0);
})();
