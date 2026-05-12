"use client";
import { useEffect, useState } from "react";
import Board from "../components/board";
import ActionBtns from "./actionBtns";
import { hostService, instance } from "../../types/product";
import { useRouter } from "next/navigation";

export default function Home() {
	const [instances, setInstances] = useState<instance[] | null>(null);
	const router = useRouter();

	useEffect(() => {
		get_instances().then((res) => {
			if (typeof res === "string") router.push(res);
			else setInstances(res);
		});
	}, []);

	if (!instances)
		return (
			<div className="flex flex-col justify-start items-start gap-5 w-full">
				<h3 className="text-2xl font-black">Instances</h3>
				<p className="text_shine">Manage your cloud infrastructure</p>
				<Board
					titles={[
						["Name", 100],
						["Status", 100],
						["IP Address", 100],
						["Load (CPU)", 100],
						["Actions", 100],
					]}
					content={
						<>
							<div className={`flex justify-center items-center w-full min-h-16 bg-(--clr-surface2) p-4 border border-(--clr-surface-light2) hover:bg-(--clr-surface) transition loading`}></div>
							<div className={`flex justify-center items-center w-full min-h-16 bg-(--clr-surface2) p-4 border border-(--clr-surface-light2) hover:bg-(--clr-surface) transition loading`}></div>
							<div className={`flex justify-center items-center w-full min-h-16 bg-(--clr-surface2) p-4 border border-(--clr-surface-light2) hover:bg-(--clr-surface) transition loading`}></div>
							<div className={`flex justify-center items-center w-full min-h-16 bg-(--clr-surface2) p-4 border border-(--clr-surface-light2) hover:bg-(--clr-surface) transition loading`}></div>
							<div className={`flex justify-center items-center w-full min-h-16 bg-(--clr-surface2) p-4 border border-(--clr-surface-light2) hover:bg-(--clr-surface) transition rounded-b-2xl loading`}></div>
						</>
					}
				/>
			</div>
		);

	return (
		<div className="flex flex-col justify-start items-start gap-5 w-full">
			<h3 className="text-2xl font-black">Instances</h3>
			<p className="text_shine">Manage your cloud infrastructure</p>
			{instances.length ? (
				<Board
					titles={[
						["Name", 100],
						["Status", 100],
						["IP Address", 100],
						["Load (CPU)", 100],
						["Actions", 100],
					]}
					content={instances.map((instance, i) => (
						<div key={instance.ip} className={`flex justify-center items-center w-full min-h-8 bg-(--clr-surface2) p-4 border border-(--clr-surface-light2) hover:bg-(--clr-surface) transition ${i + 1 == instances.length && "rounded-b-2xl"}`}>
							<p className="font-bold text-gray-400 w-full">{instance.name}</p>
							<div className="font-bold text-gray-400 w-full">
								{instance.status ? (
									<div className="flex justify-start items-center gap-2 text-green-400">
										<div className="rounded-full w-2 pulse aspect-square bg-current"></div>
										<div className="text-current">Running</div>
									</div>
								) : (
									<div className="flex justify-start items-center gap-2 text-red-400">
										<div className="rounded-full w-2 pulse aspect-square bg-current"></div>
										<div className="text-current">Stopped</div>
									</div>
								)}
							</div>
							<p className="font-bold text-gray-400 w-full">{instance.ip}</p>
							<p className="font-bold text-gray-400 w-full">{instance.cpu}</p>
							<ActionBtns />
						</div>
					))}
				/>
			) : (
				<h1 className="text-center flex justify-center items-center font-bold text-6xl w-[60dvw] h-[50dvh]">You don&apos;t have any instances yet</h1>
			)}
		</div>
	);
}

async function get_instances(): Promise<instance[] | string> {
	const raw = (await (await fetch("/api/get_owned_services")).json()) as { services: hostService[]; redirect?: string };
	if (raw.redirect) return raw.redirect;
	const instances = raw.services.map((e) => {
		return { name: e.type, status: e.active, ip: e.ip, cpu: e.usage };
	});

	return instances;
}
