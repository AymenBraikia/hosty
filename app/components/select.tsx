import { useState } from "react";
type langs = "en-us" | "en-uk" | "ar-dz" | "es-es" | "ru-ru";

export default function Select(props: { action: () => void; options: string[][]; css?: string }) {
	const [is_active, set_active] = useState<boolean>(false);

	const [lang, set_lang] = useState<langs>(() => (typeof window !== "undefined" && (localStorage.getItem("lang") as langs)) || "en-us");

	return (
		<div onClick={() => set_active(!is_active)} className={`relative text-xl focus:bg-[var(--clr-surface)] outline-0 cursor-pointer hover:rounded-none ${props.css}`}>
			{lang}

			{is_active && (
				<div className="min-w-40 absolute bg-[var(--clr-primary)] -bottom-2.5 -left-4 translate-y-full">
					{props.options.map((op, i) => {
						return <Opt val={op[0]} content={op[1]} key={i} />;
					})}
				</div>
			)}
		</div>
	);
}
function Opt(props: { val: string; content?: string }) {
	return <div className="transition px-4  bg-transparent hover:bg-[var(--clr-surface)]">{props.content || props.val}</div>;
}
