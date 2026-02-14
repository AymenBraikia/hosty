import Button from "../../components/button";
import TFA from "./components/2fa";
import Notifications from "./components/notifications";
import Input from "./input";

export default function Home() {

	return (
		<div className="flex flex-col justify-start items-start gap-5 w-full">
			<h3 className="text-2xl font-black">Profile Settings</h3>
			<div className="w-full flex flex-col justify-center items-start gap-3 bg-(--clr-surface) rounded-2xl border border-(--clr-surface-light2) p-8">
				<div className="flex justify-between items-center gap-8 w-full">
					<Input lable="First Name" default="Aymen" />
					<Input lable="Last Name" default="Braikia" />
				</div>
				<Input lable="Email Address" default="aymenbraikia1@gmail.com" />
				<Button content="Save Changes" css="bg_anim" />
			</div>

			<h3 className="text-2xl font-black">Security</h3>
			<div className="w-full flex flex-col justify-center items-start gap-8 bg-(--clr-surface) rounded-2xl border border-(--clr-surface-light2) p-8">
				<Input lable="Current Password" default="" />
				<div className="flex justify-between items-center gap-8 w-full">
					<Input lable="New Password" default="" />
					<Input lable="Confirm New Password" default="" />
				</div>
				<Button content="Update Password" css="bg_anim" />
				<TFA />
			</div>

			<Notifications />

		</div>
	);
}
