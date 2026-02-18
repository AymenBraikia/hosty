"use client";
import { ReactElement } from "react";

import Settings_UserData from "../types/settings_ctx";
import Settings from "./settings";

export default function Provider(props: { children: ReactElement<Record<string, unknown>, string>[] | ReactElement<Record<string, unknown>, string>; data: Settings_UserData | undefined }) {
	return <Settings.Provider value={props.data}>{props.children}</Settings.Provider>;
}
