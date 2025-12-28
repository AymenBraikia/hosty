"use client";
import { ReactElement } from "react";
import { domain, hostService } from "../types/product";
import User_ctx from "./user_data";

export default function Provider(props: {
	children: ReactElement<Record<string, unknown>, string>[] | ReactElement<Record<string, unknown>, string>;
	data: { wish_list: [domain | hostService]; cart: [domain | hostService]; name: string } | undefined;
}) {
	return <User_ctx.Provider value={props.data}>{props.children}</User_ctx.Provider>;
}
