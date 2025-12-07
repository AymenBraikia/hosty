import * as d3 from "d3-geo";

// Define the shape of our server data
interface ServerLocation {
	name: string;
	lat: number;
	lon: number;
}

export class DarkWorldMap {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private width: number = 0;
	private height: number = 0;
	private scale: number = 1.5;
	private drawing: boolean = false;
	private mapData = null;

	public COLORS = {
		background: "transparent",
		land: "#151b24",
		markerCore: "#0ea5e9", // Bright Cyan/Blue
		markerGlow: "#0ea5e9", // Very faint transparent blue
		// markerGlow: "rgba(14, 165, 233, 0.15)", // Very faint transparent blue
	};

	public globalAlpha: number = 1;
	public increament: number = 0.04;
	public baseIncreament: number = 0.04;
	public last_update: number = 0;

	// Major Data Center Hubs (AWS, GCP, Azure, etc.)
	private serverLocations: ServerLocation[] = [
		// US & North America
		{ name: "Atlanta", lat: 33.749, lon: -84.388 },
		{ name: "N. Virginia (Ashburn)", lat: 39.0438, lon: -77.4874 },
		{ name: "Ohio", lat: 40.4173, lon: -82.9071 },
		{ name: "Oregon", lat: 45.8263, lon: -119.207 },
		{ name: "California (San Jose)", lat: 37.3382, lon: -121.8863 },
		{ name: "Texas (Dallas)", lat: 32.7767, lon: -96.797 },
		{ name: "Canada (Montreal)", lat: 45.5017, lon: -73.5673 },

		// Europe
		{ name: "London", lat: 51.5074, lon: -0.1278 },
		{ name: "Dublin", lat: 53.3498, lon: -6.2603 },
		{ name: "Frankfurt", lat: 50.1109, lon: 8.6821 },
		{ name: "Paris", lat: 48.8566, lon: 2.3522 },
		{ name: "Stockholm", lat: 59.3293, lon: 18.0686 },
		{ name: "Milan", lat: 45.4642, lon: 9.19 },

		// Asia Pacific
		{ name: "Singapore", lat: 1.3521, lon: 103.8198 },
		{ name: "Tokyo", lat: 35.6762, lon: 139.6503 },
		{ name: "Seoul", lat: 37.5665, lon: 126.978 },
		{ name: "Mumbai", lat: 19.076, lon: 72.8777 },
		{ name: "Sydney", lat: -33.8688, lon: 151.2093 },
		{ name: "Hong Kong", lat: 22.3193, lon: 114.1694 },
		{ name: "Jakarta", lat: -6.2088, lon: 106.8456 },

		// South America
		{ name: "São Paulo", lat: -23.5505, lon: -46.6333 },
		{ name: "Santiago", lat: -33.4489, lon: -70.6693 },

		// Africa & Middle East
		{ name: "Cape Town", lat: -33.9249, lon: 18.4241 },
		{ name: "Bahrain", lat: 26.0667, lon: 50.5577 },
		{ name: "Tel Aviv", lat: 32.0853, lon: 34.7818 },
	];

	constructor(canvasId: string) {
		const el = document.getElementById(canvasId) as HTMLCanvasElement;
		if (!el) throw new Error(`Canvas with id ${canvasId} not found`);

		this.canvas = el;
		this.ctx = this.canvas.getContext("2d")!;

		this.handleResize();
		window.addEventListener("resize", () => this.handleResize());

		this.init();
	}

	private async init() {
		try {
			const response = await fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");
			const data = await response.json();

			this.mapData = {
				...data,
				features: data.features.filter((d: { id: string; properties: { name: string } }) => d.id !== "ATA" && d.properties.name !== "Antarctica"),
			};

			if (!this.drawing) {
				this.draw();
				this.drawing = true;
			}
		} catch (error) {
			console.error("Failed to load map data", error);
		}
	}

	private handleResize() {
		const parent = this.canvas.parentElement;
		if (parent) {
			this.width = parent.clientWidth;
			this.height = parent.clientHeight;
		} else {
			this.width = window.innerWidth;
			this.height = window.innerHeight;
		}

		const dpr = window.devicePixelRatio || 1;
		this.canvas.width = this.width * dpr;
		this.canvas.height = this.height * dpr;
		this.canvas.style.width = `${this.width}px`;
		this.canvas.style.height = `${this.height}px`;

		this.ctx.scale(dpr, dpr);

		// if (this.mapData) this.draw();
	}

	private draw() {
		requestAnimationFrame(this.draw.bind(this));
		if (!this.mapData) return;

		// 1. Clear & Background
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.fillStyle = this.COLORS.background;
		this.ctx.fillRect(0, 0, this.width, this.height);

		// 2. Projection
		// Using the same projection logic as before for accuracy
		const projection = d3
			.geoMercator()
			.scale(this.width / 6.4)
			.translate([this.width / 2, this.height / 1.6]);

		const pathGenerator = d3.geoPath().projection(projection).context(this.ctx);

		// 3. Draw Map Land
		this.ctx.beginPath();
		pathGenerator(this.mapData);
		this.ctx.fillStyle = this.COLORS.land;
		this.ctx.fill();

		// 4. Draw Server Markers
		this.serverLocations.forEach((loc) => {
			// D3 projection takes [Longitude, Latitude] and returns [x, y]
			const coords = projection([loc.lon, loc.lat]);

			if (coords) {
				const [x, y] = coords;

				// Draw Outer Glow (Large, Transparent)
				this.ctx.globalAlpha = this.globalAlpha;
				this.ctx.beginPath();
				this.ctx.arc(x, y, this.scale * 6 * (this.increament < 0 ? 1 - this.globalAlpha : 0), 0, 2 * Math.PI); // Radius 8
				this.ctx.fillStyle = this.COLORS.markerGlow;
				this.ctx.fill();

				// Draw Inner Core (Small, Solid)
				this.ctx.globalAlpha = 1;
				this.ctx.beginPath();
				this.ctx.arc(x, y, this.scale * 2, 0, 2 * Math.PI); // Radius 3
				this.ctx.fillStyle = this.COLORS.markerCore;
				this.ctx.fill();
			}
			this.update();
		});
	}
	private update() {
		if (Date.now() - this.last_update < 10) {
			return;
		}
		this.last_update = Date.now();

		this.globalAlpha += this.increament;
		if (this.globalAlpha <= 0 || this.globalAlpha >= 1) {
			this.increament *= -1;
			this.globalAlpha += this.increament;
		}
	}
}
