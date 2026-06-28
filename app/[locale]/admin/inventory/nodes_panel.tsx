"use client";

import { useContext, useRef, useState } from "react";
import { admin_data, hostService } from "../../types/product";
import admin_ctx from "../../context/admin_data";
import Button from "../../components/button";

export default function Nodes_panel() {
    const data = useContext(admin_ctx) as admin_data;

    const input_ref = useRef<HTMLInputElement>(null);

    const [nodes, set_nodes] = useState<hostService[]>(data.inventory);

   
    function handle_input() {
        if (!input_ref.current) return;
        const val = input_ref.current.value;
        if (!val) return set_nodes(data.inventory);
        set_nodes(data.inventory.filter((n) => n.type.toLowerCase().includes(val.toLowerCase()) || n.id == +val));
    }

    return (
        <div className="w-full flex flex-col justify-center items-start rounded-2xl overflow-hidden bg-(--clr-surface) overflow-x-auto">
            <div className="w-full p-4">
                <input className="outline-0 w-full text-[16px]" ref={input_ref} onInput={handle_input} type="text" placeholder="Search by id or type..." />
            </div>
            <div className="w-full">
                <div className="min-w-fit w-full flex justify-between items-center text-gray-400 bg-(--clr-surface2) border border-(--clr-surface-light2) font-bold p-4">
                    <p className="min-w-40 max-w-40 lg:max-w-auto lg:min-w-auto w-1/8 text-center">Service SKU</p>
                    <p className="min-w-40 max-w-40 lg:max-w-auto lg:min-w-auto w-5 text-center">ID</p>
                    <div className="flex justify-center items-center lg:gap-1 lg:w-4/8">
                        <Button css="min-w-40 max-w-40 lg:max-w-auto lg:min-w-auto w-full text-center mx-0.5 px-0" content="CPU" />
                        <Button css="min-w-40 max-w-40 lg:max-w-auto lg:min-w-auto w-full text-center mx-0.5 px-0" content="RAM" />
                        <Button css="min-w-40 max-w-40 lg:max-w-auto lg:min-w-auto w-full text-center mx-0.5 px-0" content="Storage" />
                        <Button css="min-w-40 max-w-40 lg:max-w-auto lg:min-w-auto w-full text-center mx-0.5 px-0" content="Bandwidth" />
                        <Button css="min-w-40 max-w-40 lg:max-w-auto lg:min-w-auto w-full text-center mx-0.5 px-0" content="Price/Mo" />
                    </div>
                    <p className="min-w-40 max-w-40 lg:max-w-auto lg:min-w-auto w-1/16 text-center">Visibility</p>
                    <p className="min-w-60 lg:min-w-auto w-1/6 text-center">Actions</p>
                </div>
                {nodes.map((n) => (
                    <div key={n.id} className={`min-w-fit w-full flex justify-between items-center text-gray-400 border border-(--clr-surface-light2) hover:bg-(--clr-surface-light2) p-4 transition`}>
                        <p className="z-10 min-w-40 max-w-40 lg:max-w-auto lg:min-w-auto w-1/8 text-center font-bold">{n.type}</p>
                        <p className="z-10 min-w-40 max-w-40 lg:max-w-auto lg:min-w-auto w-5 text-center font-bold">{n.id}</p>
                        <div className="min-w-fit flex justify-center items-center lg:gap-1 lg:w-4/8">
                            <p className="z-10 min-w-40 max-w-40 lg:max-w-auto lg:min-w-auto w-full text-center px-0 py-1 bg-(--clr-surface-light) border-2 border-(--clr-surface-light2) rounded-xl mx-0.5 font-bold text-nowrap">{n.specs?.cpu} VCPU</p>
                            <p className="z-10 min-w-40 max-w-40 lg:max-w-auto lg:min-w-auto w-full text-center px-0 py-1 bg-(--clr-surface-light) border-2 border-(--clr-surface-light2) rounded-xl mx-0.5 font-bold text-nowrap">{n.specs?.ram}GB RAM</p>
                            <p className="z-10 min-w-40 max-w-40 lg:max-w-auto lg:min-w-auto w-full text-center px-0 py-1 bg-(--clr-surface-light) border-2 border-(--clr-surface-light2) rounded-xl mx-0.5 font-bold text-nowrap">{n.specs?.storage}</p>
                            <p className="z-10 min-w-40 max-w-40 lg:max-w-auto lg:min-w-auto w-full text-center px-0 py-1 bg-(--clr-surface-light) border-2 border-(--clr-surface-light2) rounded-xl mx-0.5 font-bold text-nowrap">{n.specs?.bandwidth}</p>
                            <p className="z-10 min-w-40 max-w-40 lg:max-w-auto lg:min-w-auto w-full text-center font-bold">${n.price}</p>
                        </div>
                        <p className={`z-10 min-w-40 max-w-40 lg:max-w-auto lg:min-w-auto text-center font-bold rounded-xl px-4 py-2 w-fit ${n.active ? "text-green-400 bg-green-400/20" : "text-gray-400 bg-gray-400/20"}`}>
                            {n.active ? "Live" : "Hidden"}
                        </p>
                        <div className="min-w-60 max-w-60 lg:max-w-auto lg:min-w-auto z-10 flex justify-center items-center gap-4 w-1/6 text-center">
                            <Button content="Edit" css="hover:bg-(--clr-surface) transition" />
                            <Button content="Delete" css="danger transition" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}