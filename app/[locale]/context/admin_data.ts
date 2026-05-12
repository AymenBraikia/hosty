import { createContext } from "react";
import { admin_data } from "../types/product";

export default createContext<admin_data | { error: number; status_text?: string }>({ error: 0 });
