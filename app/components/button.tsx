import Link from "next/link";

export default function Button(props: { url?: string; action: (e: React.MouseEvent) => void; content: string; css?: string }) {
	return props.url ? (
		<Link href={props.url} className={`font-bold border-2 p-3 cursor-pointer rounded-2xl bg-transparent transition hover:bg-(--clr-primary) hover:text-(--clr-surface) hover:rounded-none ${props.css}`} onClick={props.action}>
			{props.content}
		</Link>
	) : (
		<button className={`font-bold border-2 p-3 cursor-pointer rounded-2xl bg-transparent transition hover:bg-(--clr-primary) hover:text-(--clr-surface) hover:rounded-none ${props.css}`} onClick={props.action}>
			{props.content}
		</button>
	);
}
