"use client";
export default function Button(props: { action: (e: React.MouseEvent) => void; content: string; css?: string }) {
	return (
		<button className={`font-bold border-2 p-3 cursor-pointer rounded-2xl bg-transparent transition hover:bg-[var(--clr-primary)] hover:text-[var(--clr-surface)] hover:rounded-none ${props.css}`} onClick={props.action}>
			{props.content}
		</button>
	);
}
