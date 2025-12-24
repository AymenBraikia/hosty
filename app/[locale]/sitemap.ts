import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://your-hostify-demo.com";

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1.0,
		},
		{
			url: `${baseUrl}/dashboard`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/servers`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/deployments`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/analytics`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/login`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.5,
		},
		{
			url: `${baseUrl}/register`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.5,
		},
	];
}
