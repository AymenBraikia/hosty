import React from "react";

export default function Board({ titles, content }: { titles: [string, number][]; content: React.JSX.Element[] | React.JSX.Element }) {
	return (
		<div className="w-full flex flex-col">
			<div className="flex flex-col justify-start items-start w-full">
				<div className="flex justify-center items-center w-full min-h-8 bg-(--clr-surface) p-4 rounded-t-2xl border border-(--clr-surface-light2)">
					{titles.map(([t, w], i) => (
						<p key={t + i} className={`font-bold text-gray-400 ${w || "w-full"}`} style={w ? { width: w + "%" } : undefined}>
							{t}
						</p>
					))}
				</div>
			</div>
			{content}
		</div>
	);
}
