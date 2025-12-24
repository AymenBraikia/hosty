import Link from "next/link";
import Code from "../components/svg/code";
import Cli from "../components/svg/cli";

export default function Body() {
	return (
		<section className="flex justify-center items-start px-30 min-h-dvh pt-40 gap-20">
			<nav className="w-60 flex flex-col justify-center items-start gap-8">
				<div className="w-full flex flex-col">
					<h4 className="text-xl font-bold mb-1.5">Getting Started</h4>
					<Link className="text-gray-400 pl-4 border-l border-l-(--clr-surface-light2) hover:text-(--clr-primary) transition py-0.5" href={"#"}>
						Introduction
					</Link>
					<Link className="text-gray-400 pl-4 border-l border-l-(--clr-surface-light2) hover:text-(--clr-primary) transition py-0.5" href={"#"}>
						Quick Start
					</Link>
					<Link className="text-gray-400 pl-4 border-l border-l-(--clr-surface-light2) hover:text-(--clr-primary) transition py-0.5" href={"#"}>
						CLI Tools
					</Link>
				</div>
				<div className="w-full flex flex-col">
					<h4 className="text-xl font-bold mb-1.5">Deployment</h4>
					<Link className="text-gray-400 pl-4 border-l border-l-(--clr-surface-light2) hover:text-(--clr-primary) transition py-0.5" href={"#"}>
						Introduction
					</Link>
					<Link className="text-gray-400 pl-4 border-l border-l-(--clr-surface-light2) hover:text-(--clr-primary) transition py-0.5" href={"#"}>
						Quick Start
					</Link>
					<Link className="text-gray-400 pl-4 border-l border-l-(--clr-surface-light2) hover:text-(--clr-primary) transition py-0.5" href={"#"}>
						CLI Tools
					</Link>
				</div>
				<div className="w-full flex flex-col">
					<h4 className="text-xl font-bold mb-1.5">Databases</h4>
					<Link className="text-gray-400 pl-4 border-l border-l-(--clr-surface-light2) hover:text-(--clr-primary) transition py-0.5" href={"#"}>
						Introduction
					</Link>
					<Link className="text-gray-400 pl-4 border-l border-l-(--clr-surface-light2) hover:text-(--clr-primary) transition py-0.5" href={"#"}>
						Quick Start
					</Link>
					<Link className="text-gray-400 pl-4 border-l border-l-(--clr-surface-light2) hover:text-(--clr-primary) transition py-0.5" href={"#"}>
						CLI Tools
					</Link>
				</div>
				<div className="w-full flex flex-col">
					<h4 className="text-xl font-bold mb-1.5">API Reference</h4>
					<Link className="text-gray-400 pl-4 border-l border-l-(--clr-surface-light2) hover:text-(--clr-primary) transition py-0.5" href={"#"}>
						Introduction
					</Link>
					<Link className="text-gray-400 pl-4 border-l border-l-(--clr-surface-light2) hover:text-(--clr-primary) transition py-0.5" href={"#"}>
						Quick Start
					</Link>
					<Link className="text-gray-400 pl-4 border-l border-l-(--clr-surface-light2) hover:text-(--clr-primary) transition py-0.5" href={"#"}>
						CLI Tools
					</Link>
				</div>
			</nav>
			<div className="w-full flex justify-center items-start flex-col gap-10">
				<h1 className="font-black text-4xl">Documentation</h1>
				<p className="text_shine text-xl">Welcome to the Hosty documentation. Learn how to deploy, scale, and manage your applications.</p>
				<div className="flex justify-between items-center w-full">
					<Link className="w-[48%] min-h-50 flex flex-col justify-center items-start gap-3 p-8 bg-(--clr-surface) rounded-2xl border border-(--clr-surface-light2) hover:border-(--clr-primary) transition" href={"#"}>
						<Cli color="var(--clr-primary)" s={30} />
						<h3 className="font-black text-2xl">Hosty CLI</h3>
						<p className="text_shine">Manage your infrastructure directly from your terminal.</p>
					</Link>
					<Link className="w-[48%] min-h-50 flex flex-col justify-center items-start gap-3 p-8 bg-(--clr-surface) rounded-2xl border border-(--clr-surface-light2) hover:border-(--clr-primary) transition" href={"#"}>
						<Code color="var(--clr-primary)" s={30} />
						<h3 className="font-black text-2xl">API Reference</h3>
						<p className="text_shine">Integrate Hosty into your own applications programmatically.</p>
					</Link>
				</div>
				<h3 className="text-2xl font-bold">Quick Start</h3>
				<div className="flex flex-col justify-center items-start gap-4 p-8 bg-(--clr-surface2) w-full border border-(--clr-surface-light2) rounded-2xl code-font text-[14px]">
					<p className="text-gray-500"># Install the CLI</p>
					<p>npm install -g hosty-cli</p>
					<p className="text-gray-500"># Login to your account</p>
					<p>hosty login &lt;email&gt; &lt;password&gt;</p>
				</div>
			</div>
		</section>
	);
}
