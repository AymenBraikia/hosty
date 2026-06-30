import { Nunito, JetBrains_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const myFont = Nunito({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-main",
});

const myFont2 = JetBrains_Mono({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-terminal",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://hosty-three.vercel.app/en"),
    title: {
        default: "Hostify – Modern Hosting Dashboard for Developers",
        template: "%s | Hostify",
    },
    description:
        "Hostify is a modern hosting dashboard showcasing real-time server monitoring, deployment tools, and a clean developer-focused UI. Built with Next.js and TypeScript to demonstrate full-stack engineering and UI/UX excellence.",
    keywords: [
        "hosting dashboard",
        "server manager",
        "web hosting",
        "cloud hosting panel",
        "devops tools",
        "modern UI",
        "developer tools",
        "Next.js project",
        "TypeScript app",
        "portfolio project",
        "server monitoring app",
        "deployment dashboard",
    ],
    authors: [{ name: "Aymen Braikia" }],
    creator: "Aymen Braikia",
    publisher: "Hostify",
    applicationName: "Hostify",
    category: "Technology",
    generator: "Next.js",
    icons: {
        icon: "/logo.png",
        shortcut: "/logo.png",
        apple: "/apple-icon.png",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://hosty-three.vercel.app/en",
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
        canonical: "https://hosty-three.vercel.app/en",
    },
};
export const viewport: Viewport = {
    themeColor: "#0A0A0A",
};

import { NextIntlClientProvider } from "next-intl";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${myFont.variable} ${myFont2.variable}`}>
            <body>
                <NextIntlClientProvider>{children}</NextIntlClientProvider>
            </body>
        </html>
    );
}
