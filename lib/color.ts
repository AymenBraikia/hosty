/**
 * Class to manage a smooth, repeating gradient cycle between multiple colors.
 * The public method getNextColor() should be called repeatedly (e.g., inside an animation loop).
 */
export class ColorCycleGradient {
	// --- Configuration ---
	private readonly hexColors = ["#0EA5E9", "#8400ff", "#ff00ea"]; // Blue -> Purple -> Magenta
	// private readonly hexColors = ["#8400ff", "#f700ff", "#ff00ea"]; // Blue -> Purple -> Magenta
	private readonly stepSize = 0.01; // Controls the speed. 0.01 means 100 steps (calls) per full transition.

	// --- State ---
	private colors: { r: number; g: number; b: number }[];
	private currentIndex = 0;
	private progress = 0.0; // Interpolation factor (0.0 to 1.0)

	constructor() {
		// Convert hex colors to RGB on initialization for faster calculations
		this.colors = this.hexColors.map((hex) => this.hexToRgb(hex));
	}

	// --- Helper Functions ---

	/** Converts a hexadecimal color string (#RRGGBB) to an RGB object. */
	private hexToRgb(hex: string): { r: number; g: number; b: number } {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		if (!result) throw new Error("Invalid hex color format.");
		return {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16),
		};
	}

	/** Converts RGB components back to a hexadecimal color string. */
	private rgbToHex(r: number, g: number, b: number): string {
		const componentToHex = (c: number) => {
			const hex = Math.round(Math.min(255, Math.max(0, c))).toString(16);
			return hex.length === 1 ? "0" + hex : hex;
		};
		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	}

	// --- Main Functionality ---

	/**
	 * Calculates the next interpolated color in the cycle.
	 * Call this function repeatedly (e.g., in a requestAnimationFrame loop).
	 * * @returns The resulting hexadecimal color string (your variable 'a').
	 */
	public getNextColor(): string {
		// 1. Determine Start and End Colors for the current step
		const startColor = this.colors[this.currentIndex];
		const nextIndex = (this.currentIndex + 1) % this.colors.length;
		const endColor = this.colors[nextIndex];

		// 2. Interpolate RGB components based on current progress (t)
		const t = this.progress;

		// The linear interpolation formula: C = A + (B - A) * t
		const r = startColor.r + (endColor.r - startColor.r) * t;
		const g = startColor.g + (endColor.g - startColor.g) * t;
		const b = startColor.b + (endColor.b - startColor.b) * t;

		// 3. Update State for the next call
		this.progress += this.stepSize;

		// Check if transition is complete (progress >= 1.0)
		if (this.progress >= 1.0) {
			this.progress = 0.0; // Reset progress
			this.currentIndex = nextIndex; // Move to the next color stop
		}

		// 4. Return the new color
		return this.rgbToHex(r, g, b);
	}
}
