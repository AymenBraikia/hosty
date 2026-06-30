"use client";
import user_data from "../context/user_data";
import { useContext } from "react";

import Billing from "../components/svg/billing";
import Pulse from "../components/svg/pulse";
import Resume from "../components/svg/resume";
import Server from "../components/svg/server";
import UserData from "../types/user_ctx";

export default function Body() {
	const data = useContext(user_data)! as UserData;

	return (
		<>
			<div className="w-full h-fit flex justify-between items-center gap-4 flex-wrap lg:flex-nowrap">
				<div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] p-8 lg:p-4 rounded-2xl bg-(--clr-surface) border border-(--clr-surface-light2) flex flex-col justify-center items-start gap-4 ">
					<h4 className="text-gray-300 font-bold lg:text-[16px] text-xl">Total Instances</h4>
					<div className="flex justify-between items-center w-full">
						<p className="font-bold text-2xl">{data?.services.length}</p>
						<div className="aspect-square w-10 bg-(--clr-surface2) rounded-xl flex justify-center items-center text-(--clr-primary)">
							<Server s={24} color="currentColor" />
						</div>
					</div>
				</div>
				<div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] p-8 lg:p-4 rounded-2xl bg-(--clr-surface) border border-(--clr-surface-light2) flex flex-col justify-center items-start gap-4">
					<h4 className="text-gray-300 font-bold lg:text-[16px] text-xl">Active Instances</h4>
					<div className="flex justify-between items-center w-full">
						<p className="font-bold text-2xl">{data?.services.filter((e: { active: boolean }) => e.active).length}</p>
						<div className="aspect-square w-10 bg-(--clr-surface2) rounded-xl flex justify-center items-center text-green-400">
							<Resume s={20} color="currentColor" />
						</div>
					</div>
				</div>
				<div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] p-8 lg:p-4 rounded-2xl bg-(--clr-surface) border border-(--clr-surface-light2) flex flex-col justify-center items-start gap-4">
					<h4 className="text-gray-300 font-bold lg:text-[16px] text-xl">Monthly Cost</h4>
					<div className="flex justify-between items-center w-full">
						<p className="font-bold text-2xl">${data ? data.services.reduce((prev: number, item: { price: number }) => prev + item.price, 0).toFixed(2) : 0}</p>
						<div className="aspect-square w-10 bg-(--clr-surface2) rounded-xl flex justify-center items-center text-(--clr-accent2)">
							<Billing s={24} color="currentColor" />
						</div>
					</div>
				</div>
				<div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] p-8 lg:p-4 rounded-2xl bg-(--clr-surface) border border-(--clr-surface-light2) flex flex-col justify-center items-start gap-4">
					<h4 className="text-gray-300 font-bold lg:text-[16px] text-xl">Uptime</h4>
					<div className="flex justify-between items-center w-full">
						<p className="font-bold text-2xl">99.9%</p>
						<div className="aspect-square w-10 bg-(--clr-surface2) rounded-xl flex justify-center items-center text-(--clr-accent)">
							<Pulse s={24} color="currentColor" />
						</div>
					</div>
				</div>
			</div>

			<div className="w-full flex flex-col justify-start items-start bg-(--clr-surface) rounded-2xl p-4 sm:p-8">
				<h3 className="font-bold text-2xl">Recent Activity</h3>
				{data?.recent_activity.map((e: { id: string; title: string; description: string; date: string; status: number }) => (
					<div key={e.id} className="flex justify-between items-center w-full relative py-4 px-6 border-b border-(--clr-surface-light2)">
						<div>
							<div className="bg-(--clr-primary) w-2 aspect-square rounded-full absolute left-0 top-1/2 -translate-y-1/2"></div>
							<div className="flex flex-col justify-center items-start">
								<h6 className="font-bold">{e.title}</h6>
								<p className="text-xs text-gray-500">{e.description}</p>
							</div>
						</div>
						<div className="flex flex-col justify-center items-start">
							<p className="text-xs text-gray-400">{e.date}</p>
							<h6 className={`text-[14px] font-bold ${e.status == 2 ? "text-green-400" : e.status == 1 ? "text-red-400" : "text-orange-400"}`}>{e.status == 2 ? "Completed" : e.status == 1 ? "Failled" : "Pending"}</h6>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
