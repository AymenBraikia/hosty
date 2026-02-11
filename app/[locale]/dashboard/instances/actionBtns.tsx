"use client";

import Button from "../../components/button";
import Shell from "../../components/svg/shell";
import Turnoff from "../../components/svg/turnoff";

export default function ActionBtns() {
	return (
		<div className="flex justify-start items-center gap-4 w-full">
			<Button css="text-green-400 p-3 transition hover:bg-(--clr-surface-light)" children_el={<Shell s={16} />} />
			<Button css="text-red-400 p-3 transition hover:bg-(--clr-surface-light)" children_el={<Turnoff s={16} />} />
		</div>
	);
}
