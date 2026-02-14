"use client";
import Check_box from "@/app/[locale]/components/cbox";

export default function Notifications() {
	return (
		<>
			<h3 className="text-2xl font-black">Notitications</h3>
			<div className="w-full flex flex-col justify-center items-start bg-(--clr-surface) rounded-2xl border border-(--clr-surface-light2) p-8">
				<Check_box css="justify-between w-full" label="Billing Alerts" state />
				<hr className="w-full text-(--clr-surface-light2)" />
				<Check_box css="justify-between w-full" label="Maintenance Updates" state />
				<hr className="w-full text-(--clr-surface-light2)" />
				<Check_box css="justify-between w-full" label="Marketing Emails" state />
			</div>
		</>
	);
}
