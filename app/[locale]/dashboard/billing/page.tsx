"use client";
import { useRouter } from "next/navigation";
import Board from "../components/board";
import { useEffect, useState } from "react";
import { Bill } from "../../types/product";

export default function Home() {
    const [bills, setBills] = useState<Bill[] | null>(null);
    const router = useRouter();

    useEffect(() => {
        get_billss().then((res) => {
            if (typeof res === "string") router.push(res);
            else setBills(res);
        });
    }, []);

    if (!bills)
        return (
            <div className="flex flex-col justify-start items-start gap-5 w-full">
                <h3 className="text-2xl font-black">Billing</h3>
                <p className="text_shine">Your bills history</p>
                <Board
                    titles={[
                        ["Date", 20],
                        ["Description", 60],
                        ["Paid", 10],
                        ["Amount", 10],
                    ]}
                />
            </div>
        );
    return (
        <div className="flex flex-col justify-start items-start gap-5 w-full">
            <h3 className="text-2xl font-black">Billing</h3>
            <p className="text_shine">Your bills history</p>
            {bills.length ? (
                <Board
                    titles={[
                        ["Date", 20],
                        ["Description", 40],
                        ["Paid", 20],
                        ["Amount", 20],
                    ]}
                    content={bills.map((t, i) => (
                        <div
                            key={t.description + i}
                            className={`min-w-fit flex justify-center items-center w-full min-h-8 bg-(--clr-surface2) p-4 border border-(--clr-surface-light2) hover:bg-(--clr-surface) transition ${i + 1 == bills.length && "rounded-b-2xl"}`}
                        >
                            <p className="min-w-40 lg:min-w-auto font-bold text-gray-400 w-1/5">{t.date}</p>
                            <p className="min-w-40 lg:min-w-auto font-bold text-gray-400 w-2/5">{t.description}</p>
                            <div className={`min-w-40 lg:min-w-auto font-bold text-xs  w-1/5 ${t.paid ? "text-green-400" : "text-red-400"}`}>
                                {t.paid ? <p className={"border border-current w-fit px-3 py-1 rounded-xl bg-green-400/10"}>PAID</p> : <p className={"border border-current w-fit px-3 py-1 rounded-xl bg-red-400/10"}>NOT PAID</p>}
                            </div>
                            <p className="min-w-40 lg:min-w-auto font-bold text-gray-400 w-1/5">${t.price}</p>
                        </div>
                    ))}
                />
            ) : (
                <h1 className="text-center flex justify-center items-center font-bold text-6xl w-[60dvw] h-[50dvh]">You don&apos;t have any bills yet</h1>
            )}
        </div>
    );
}

async function get_billss(): Promise<Bill[] | string> {
    const raw = (await (await fetch("/api/get_billing")).json()) as { bills: Bill[]; redirect?: string };

    if (raw.redirect) return raw.redirect;

    const bills = raw.bills.map((e) => ({
        date: e.date,
        description: e.description,
        price: e.price,
        paid: e.paid,
        id: e.id,
    }));

    return bills;
}
