"use client";
import Check_box from "@/app/[locale]/components/cbox";
import settings from "@/app/[locale]/context/settings";
import { useContext } from "react";

export default function Notifications() {
	const data = useContext(settings)!;

	return (
		<>
			<h3 className="text-2xl font-black">Notitications</h3>
			<div className="w-full flex flex-col justify-center items-start bg-(--clr-surface) rounded-2xl border border-(--clr-surface-light2) p-8">
				<Check_box css="justify-between w-full" label="Billing Alerts" state={data.notifications.billing} />
				<hr className="w-full text-(--clr-surface-light2)" />
				<Check_box css="justify-between w-full" label="Maintenance Updates" state={data.notifications.maintenance} />
				<hr className="w-full text-(--clr-surface-light2)" />
				<Check_box css="justify-between w-full" label="Marketing Emails" state={data.notifications.marketing} />
			</div>
		</>
	);
}
