import { useState } from "react";

export default function Select(props: { default?: string; action: (e: React.MouseEvent) => void; options: string[][]; css?: string }) {
	const [is_active, set_active] = useState<boolean>(false);

	return (
		<div onClick={() => set_active(!is_active)} className={`relative text-xl outline-0 cursor-pointer hover:rounded-none z-50 ${props.css}`}>
			{props.default || props.options[0][1] || props.options[0][0]}

			{is_active && (
				<div className="min-w-40 max-h-40 bg-(--clr-surface) rounded-xl overflow-y-auto no_scrollbar absolute -bottom-2.5 -left-4 translate-y-full">
					{props.options.map((op, i) => (
						<Opt action={props.action} val={op[0]} content={op[1]} key={i} />
					))}
				</div>
			)}
		</div>
	);
}
function Opt(props: { val: string; action?: (e: React.MouseEvent) => void; content?: string }) {
	return (
		<div data-val={props.val} onClick={props.action} className="transition px-4  bg-white/20 p-1 hover:bg-white/40">
			{props.content || props.val}
		</div>
	);
}
