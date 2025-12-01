// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const myFont = localFont({
	src: [
		{
			path: "../public/fonts/Nunito/Nunito-ExtraLight.ttf",
			weight: "200",
			style: "normal",
		},
		{
			path: "../public/fonts/Nunito/Nunito-Light.ttf",
			weight: "300",
			style: "normal",
		},
		{
			path: "../public/fonts/Nunito/Nunito-Regular.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../public/fonts/Nunito/Nunito-Medium.ttf",
			weight: "500",
			style: "normal",
		},
		{
			path: "../public/fonts/Nunito/Nunito-SemiBold.ttf",
			weight: "600",
			style: "normal",
		},
		{
			path: "../public/fonts/Nunito/Nunito-Bold.ttf",
			weight: "700",
			style: "normal",
		},
		{
			path: "../public/fonts/Nunito/Nunito-ExtraBold.ttf",
			weight: "800",
			style: "normal",
		},
		{
			path: "../public/fonts/Nunito/Nunito-Black.ttf",
			weight: "900",
			style: "normal",
		},
	],
	variable: "--font-main",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://your-hostify-demo.com"),
	title: {
		default: "Hostify – Modern Hosting Dashboard for Developers",
		template: "%s | Hostify",
	},
	description: "Hostify is a modern hosting dashboard showcasing real-time server monitoring, deployment tools, and a clean developer-focused UI. Built with Next.js and TypeScript to demonstrate full-stack engineering and UI/UX excellence.",
	keywords: ["hosting dashboard", "server manager", "web hosting", "cloud hosting panel", "devops tools", "modern UI", "developer tools", "Next.js project", "TypeScript app", "portfolio project", "server monitoring app", "deployment dashboard"],
	authors: [{ name: "Aymen Braikia" }],
	creator: "Aymen Braikia",
	publisher: "Hostify",
	applicationName: "Hostify",
	category: "Technology",
	generator: "Next.js",
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
		apple: "/apple-icon.png",
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://your-hostify-demo.com",
		siteName: "Hostify",
		title: "Hostify – Modern Hosting Dashboard",
		description: "A fast, intuitive hosting dashboard for developers. Real-time server insights, deployments, and system metrics in a clean UI.",
		images: [
			{
				url: "/thumbnail.png",
				width: 1200,
				height: 630,
				alt: "Hostify Dashboard Preview",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Hostify – Modern Hosting Dashboard",
		description: "Developer-friendly hosting dashboard showcasing system metrics, deployments, and real-time server monitoring.",
		images: ["/thumbnail.png"],
		creator: "@yourHandle",
	},
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-snippet": -1,
			"max-image-preview": "large",
		},
	},
	alternates: {
		canonical: "https://your-hostify-demo.com",
	},
	themeColor: "#0A0A0A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={myFont.variable}>
			<body>{children}</body>
		</html>
	);
}
