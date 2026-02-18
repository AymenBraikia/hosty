// "use client";
import { createContext } from "react";
import Settings_UserData from "../types/settings_ctx";

export default createContext<Settings_UserData | undefined>(undefined);
