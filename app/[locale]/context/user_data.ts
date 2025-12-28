// "use client";
import { createContext } from "react";
import { domain, hostService } from "../types/product";

export default createContext<{ wish_list: [domain | hostService]; cart: [domain | hostService]; name: string } | undefined>(undefined);
