import { CSSProperties } from "react";

export default function Input(props: { default: string; max?: number; min?: number; err?: string; id?: string; placeholder?: string; lable?: string; action?: () => void | Promise<unknown>; css?: string; styles?: CSSProperties }) {
	return (
		<div className={`w-full flex flex-col gap-1 ${props.err ? "text-red-400" : "text-gray-400"}`}>
			{props.lable && <p className="font-bold transition text-current">{props.lable}</p>}
			<input
				id={props.id}
				style={{ backgroundColor: props.err ? "#ff646747" : "var(--clr-surface2)", ...props.styles }}
				className={`outline-0 border transition ${props.err ? "border-red-400" : "border-(--clr-surface-light2)"} rounded-xl p-3 w-full ${props.css}`}
				type="text"
				defaultValue={props.default}
				placeholder={props.placeholder || props.lable}
				maxLength={props.max}
				minLength={props.min}
				onInput={props.action}
			/>
			{props.err && <p className="text-xs">{props.err}</p>}
		</div>
	);
}
