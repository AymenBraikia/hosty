import Cart from "../../components/svg/cart";
import Dollar from "../../components/svg/dollar";
import Processing from "../../components/svg/processing";

export default function Body() {
	return (
		<>
			<div className="flex justify-start items-center gap-4 font-bold">
				<div className="flex justify-between items-center w-full flex-wrap bg-(--clr-surface) border-2 border-(--clr-surface-light2) p-4 rounded-2xl">
					<div className="flex justify-between items-center w-full">
						<h5 className="text-gray-400">TOTAL ORDERS</h5>
						<div className="bg-blue-400/20 text-blue-400 p-2 rounded-2xl">
							<Cart s={24} />
						</div>
					</div>
					<p className="text-3xl">5</p>
				</div>
				<div className="flex justify-between items-center w-full flex-wrap bg-(--clr-surface) border-2 border-(--clr-surface-light2) p-4 rounded-2xl">
					<div className="flex justify-between items-center w-full">
						<h5 className="text-gray-400">AVG ORDER VALUE</h5>
						<div className="bg-green-400/20 text-green-400 p-2 rounded-2xl">
							<Dollar s={24} />
						</div>
					</div>
					<p className="text-3xl">$34.59</p>
				</div>
				<div className="flex justify-between items-center w-full flex-wrap bg-(--clr-surface) border-2 border-(--clr-surface-light2) p-4 rounded-2xl">
					<div className="flex justify-between items-center w-full">
						<h5 className="text-gray-400">PENDING PROCESSING</h5>
						<div className="bg-yellow-400/20 text-yellow-400 p-2 rounded-2xl">
							<Processing s={24} />
						</div>
					</div>
					<p className="text-3xl">2</p>
				</div>
			</div>


            <div className=""></div>
		</>
	);
}
