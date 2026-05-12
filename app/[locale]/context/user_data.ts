import { createContext } from "react";
import { admin_data } from "../types/product";

export default createContext<admin_data | undefined>(undefined);
