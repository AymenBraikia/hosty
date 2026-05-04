"use client";
import { ReactElement } from "react";
import User_ctx from "./user_data";
import UserData from "../types/user_ctx";

export default function Provider(props: { children: ReactElement<Record<string, unknown>, string>[] | ReactElement<Record<string, unknown>, string>; data:  UserData | undefined }) {
	return <User_ctx.Provider value={props.data}>{props.children}</User_ctx.Provider>;
}
