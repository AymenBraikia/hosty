import Link from "next/link";

export default function Button(props: { children_el?: React.JSX.Element; url?: string; action?: (e: React.MouseEvent) => void; content: string; css?: string }) {
	return props.url ? (
		<Link href={props.url} className={`font-bold p-3 cursor-pointer rounded-2xl bg-transparent transition ${props.css}`} onClick={props.action}>
			{props.content}
			{props.children_el}
		</Link>
	) : (
		<button className={`font-bold p-3 cursor-pointer rounded-2xl bg-transparent transition ${props.css}`} onClick={props.action}>
			{props.content}
			{props.children_el}
		</button>
	);
}
