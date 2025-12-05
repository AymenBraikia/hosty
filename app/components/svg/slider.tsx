const technologies = ["Next.js", "Golang", "PHP 8", "Redis", "React", "Node.js", "Docker", "Python", "WordPress", "Kubernetes", "PostgreSQL"];

export default function TechStackMarquee() {
	// Duplicate the list to create the seamless 'infinite' effect
	const marqueeContent = [...technologies, ...technologies];

	return (
		<div className="w-full overflow-hidden whitespace-nowrap py-4 bg-gray-900 shadow-lg">
			<div className="inline-flex space-x-12 animate-marquee select-none py-10">
				{marqueeContent.map((tech, index) => (
					<div
						key={`${tech}-${index}`}
						className="shrink-0 text-2xl font-semibold text-gray-400 hover:text-(--clr-primary) transition-colors px-6"
					>
						{tech}
					</div>
				))}
			</div>
		</div>
	);
}
