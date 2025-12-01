"use client";
export default function Button(props: { action: (e: React.MouseEvent) => void; content: string }) {
	return (
		<button className="font-bold text-2xl border-2 p-2.5 cursor-pointer rounded-2xl bg-transparent transition hover:bg-[var(--clr-primary)] hover:text-[var(--clr-surface)]" onClick={props.action}>
			{props.content}
		</button>
	);
}
