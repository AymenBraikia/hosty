import getUser from "@/lib/getUser";
import { use } from "react";

export default function Home() {
    const data = use(getUser());
    return <div className="flex flex-col overflow-hidden"></div>;
}
