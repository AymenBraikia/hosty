import Button from "../components/button";
import Body from "./body";

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

			<Body />
		</div>
	);
}
