import Billing from "../components/svg/billing";
import Pulse from "../components/svg/pulse";
import Resume from "../components/svg/resume";
import Server from "../components/svg/server";
import Button from "../components/button";

export default function Home() {
	return (
		<div className="flex flex-col justify-start items-start gap-5 w-full">
			<div className="w-full flex justify-between items-center">
				<div className="flex flex-col justify-start items-start">
					<h3 className="text-2xl font-black">Overview</h3>
					<p className="text_shine">Manage your cloud infrastructure</p>
				</div>
				<Button css="bg_anim rounded-full" content="+ New Resource" url="/hosting" />
			</div>
			<div className="w-full h-fit flex justify-between items-center gap-4">
				<div className="w-1/3 p-8 rounded-2xl bg-(--clr-surface) border border-(--clr-surface-light2) flex flex-col justify-center items-start gap-4 ">
					<h4 className="text-gray-300 font-bold text-xl">Total Instances</h4>
					<div className="flex justify-between items-center w-full">
						<p className="font-bold text-2xl">3</p>
						<div className="aspect-square w-10 bg-(--clr-surface2) rounded-xl flex justify-center items-center text-(--clr-primary)">
							<Server s={24} color="currentColor" />
						</div>
					</div>
				</div>
				<div className="w-1/3 p-8 rounded-2xl bg-(--clr-surface) border border-(--clr-surface-light2) flex flex-col justify-center items-start gap-4">
					<h4 className="text-gray-300 font-bold text-xl">Active Instances</h4>
					<div className="flex justify-between items-center w-full">
						<p className="font-bold text-2xl">3</p>
						<div className="aspect-square w-10 bg-(--clr-surface2) rounded-xl flex justify-center items-center text-green-400">
							<Resume s={20} color="currentColor" />
						</div>
					</div>
				</div>
				<div className="w-1/3 p-8 rounded-2xl bg-(--clr-surface) border border-(--clr-surface-light2) flex flex-col justify-center items-start gap-4">
					<h4 className="text-gray-300 font-bold text-xl">Monthly Cost</h4>
					<div className="flex justify-between items-center w-full">
						<p className="font-bold text-2xl">$124.50</p>
						<div className="aspect-square w-10 bg-(--clr-surface2) rounded-xl flex justify-center items-center text-(--clr-accent2)">
							<Billing s={24} color="currentColor" />
						</div>
					</div>
				</div>
				<div className="w-1/3 p-8 rounded-2xl bg-(--clr-surface) border border-(--clr-surface-light2) flex flex-col justify-center items-start gap-4">
					<h4 className="text-gray-300 font-bold text-xl">Uptime</h4>
					<div className="flex justify-between items-center w-full">
						<p className="font-bold text-2xl">99.9%</p>
						<div className="aspect-square w-10 bg-(--clr-surface2) rounded-xl flex justify-center items-center text-(--clr-accent)">
							<Pulse s={24} color="currentColor" />
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col justify-start items-start bg-(--clr-surface) w-full rounded-2xl p-8">
				<h3 className="font-bold text-2xl">Recent Activity</h3>
				<div className="flex justify-between items-center w-full relative py-4 px-6 border-b border-(--clr-surface-light2)">
					<div>
						<div className="bg-(--clr-primary) w-2 aspect-square rounded-full absolute left-0 top-1/2 -translate-y-1/2"></div>
						<div className="flex flex-col justify-center items-start">
							<h6 className="font-bold">Created new VPS</h6>
							<p className="text-xs text-gray-500">srv-03 (starting-env)</p>
						</div>
					</div>
					<div className="flex flex-col justify-center items-start">
						<p className="text-xs text-gray-400">2 hours ago</p>
						<h6 className="text-green-400 text-[14px] font-bold">Completed</h6>
					</div>
				</div>
				<div className="flex justify-between items-center w-full relative py-4 px-6 border-b border-(--clr-surface-light2)">
					<div>
						<div className="bg-(--clr-primary) w-2 aspect-square rounded-full absolute left-0 top-1/2 -translate-y-1/2"></div>
						<div className="flex flex-col justify-center items-start">
							<h6 className="font-bold">Created new VPS</h6>
							<p className="text-xs text-gray-500">srv-03 (starting-env)</p>
						</div>
					</div>
					<div className="flex flex-col justify-center items-start">
						<p className="text-xs text-gray-400">2 hours ago</p>
						<h6 className="text-green-400 text-[14px] font-bold">Completed</h6>
					</div>
				</div>
				<div className="flex justify-between items-center w-full relative py-4 px-6 border-b border-(--clr-surface-light2)">
					<div>
						<div className="bg-(--clr-primary) w-2 aspect-square rounded-full absolute left-0 top-1/2 -translate-y-1/2"></div>
						<div className="flex flex-col justify-center items-start">
							<h6 className="font-bold">Created new VPS</h6>
							<p className="text-xs text-gray-500">srv-03 (starting-env)</p>
						</div>
					</div>
					<div className="flex flex-col justify-center items-start">
						<p className="text-xs text-gray-400">2 hours ago</p>
						<h6 className="text-green-400 text-[14px] font-bold">Completed</h6>
					</div>
				</div>
			</div>
		</div>
	);
}
