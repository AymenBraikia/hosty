import Button from "../../components/button";

export default function Manage_btns() {
	return (
		<div className="min-w-40 lg:min-w-auto font-bold text-gray-400 w-full">
			<Button css="transition hover:bg-(--clr-surface-light2)" content="DNS" />
		</div>
	);
}
