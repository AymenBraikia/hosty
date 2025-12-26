export default function Input(props: { type: string; placeholder?: string }) {
	return (
		<div className="w-full relative flex flex-col justify-start items-start group">
			<div className="absolute left-0 top-0 bg-(--clr-surface2) w-full h-full"></div>
			<div className="text_anim2 text-[var(--color-gray-500)!important] absolute left-6 top-1/2 -translate-y-1/2 transition group-focus-within:left-2 group-focus-within:top-0 group-focus-within:text-[transparent!important] group-focus-within:z-10 group-focus-within:-translate-y-full">
				{props.placeholder}
			</div>
			<input name={props.type} data-placeholder={props.placeholder} type={props.type} className="relative outline-0 w-full transition p-4" />
			<div className="left-0 bottom-0 bg_anim2 w-0 h-px z-10 transition group-focus-within:w-full"></div>
		</div>
	);
}
