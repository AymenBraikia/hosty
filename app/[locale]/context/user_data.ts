// "use client";
import { createContext } from "react";
import UserData from "../types/user_ctx";

export default createContext<UserData | undefined>(undefined);
