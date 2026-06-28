"use client";
import { useEffect, useState } from "react";
import Check_box from "../../components/cbox";
import Board from "../components/board";
import Manage_btns from "./manage";
import { useRouter } from "next/navigation";
import { Domain } from "../../types/product";

export default function Home() {
    const [domains, setDomains] = useState<Domain[] | null>(null);
    const router = useRouter();

    useEffect(() => {
        get_domains().then((res) => {
            if (typeof res === "string") router.push(res);
            else setDomains(res);
        });
    }, []);

    if (!domains)
        return (
            <div className="flex flex-col justify-start items-start gap-5 w-full">
                <h3 className="text-2xl font-black">Domains</h3>
                <p className="text_shine">Manage your registered domains</p>
                <Board
                    titles={[
                        ["Domain", 100],
                        ["Status", 100],
                        ["Registered", 100],
                        ["Expires", 100],
                        ["Auto", 100],
                        ["Manage", 100],
                    ]}
                />
            </div>
        );

    return (
        <div className="flex flex-col justify-start items-start gap-5 w-full">
            <h3 className="text-2xl font-black">Domains</h3>
            <p className="text_shine">Manage your registered domains</p>
            {domains.length ? (
                <Board
                    titles={[
                        ["Domain", 100],
                        ["Status", 100],
                        ["Registered", 100],
                        ["Expires", 100],
                        ["Auto", 100],
                        ["Manage", 100],
                    ]}
                    content={domains.map((domain, i) => (
                        <div
                            key={domain.name}
                            className={`flex justify-center items-center min-w-fit w-full min-h-8 bg-(--clr-surface2) p-4 border border-(--clr-surface-light2) hover:bg-(--clr-surface) transition ${i + 1 == domains.length && "rounded-b-2xl"}`}
                        >
                            <p className="font-bold min-w-40 lg:min-w-auto text-gray-400 w-full">{domain.name}</p>
                            <div className="font-bold min-w-40 lg:min-w-auto text-gray-400 w-full">
                                {domain.status ? <p className="flex justify-start items-center text-green-400">Active</p> : <p className="flex justify-start items-center text-red-400">Expired</p>}
                            </div>
                            <p className="font-bold min-w-40 lg:min-w-auto text-gray-400 w-full">{domain.reg}</p>
                            <p className="font-bold min-w-40 lg:min-w-auto text-gray-400 w-full">{domain.exp}</p>
                            <div className="w-full min-w-40 lg:min-w-auto">
                                <Check_box display_status state={domain.status} />
                            </div>
                            <Manage_btns />
                        </div>
                    ))}
                />
            ) : (
                <h1 className="text-center flex justify-center items-center font-bold text-6xl w-[60dvw] h-[50dvh]">You don&apos;t have any registered domains</h1>
            )}
        </div>
    );
}

async function get_domains(): Promise<Domain[] | string> {
    const raw = (await (await fetch("/api/get_owned_domains")).json()) as { services: Domain[]; redirect?: string };
    if (raw.redirect) return raw.redirect;
    const instances = raw.services.map((e) => ({ name: e.name, status: e.status, reg: e.reg, exp: e.exp, renew: e.renew }));

    return instances;
}
