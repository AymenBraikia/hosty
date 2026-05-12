"use client";
import { ReactElement } from "react";
import Admin_ctx from "./admin_data";
import { admin_data } from "../types/product";

export default function Provider(props: { children: ReactElement<Record<string, unknown>, string>[] | ReactElement<Record<string, unknown>, string>; data: admin_data | { error: number; status_text?: string }}) {
	return <Admin_ctx.Provider value={props.data}>{props.children}</Admin_ctx.Provider>;
}
