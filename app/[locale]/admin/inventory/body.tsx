import Nodes_panel from "./nodes_panel";


export default function Body() {
	return (
		<div className="flex flex-col gap-8 overflow-hidden">
			<div>
				<h1 className="text-4xl font-bold">Inventory</h1>
				<p className="text_shine">Manage available nodes</p>
			</div>
            
        <Nodes_panel/>
		</div>
	);
}
