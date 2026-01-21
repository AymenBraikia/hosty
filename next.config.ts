import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
	devIndicators: false,
	compress: true,
	reactStrictMode: true,
	turbopack: {
		root: ".",
	},
};

export default withNextIntl(nextConfig);
