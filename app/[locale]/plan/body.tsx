import { domain, hostService } from "../types/product";

import Button from "../components/button";
import Arrow from "../components/svg/arrow";

import Service_display from "./service";
import getUser from "@/lib/getUser";

export default async function Body({ id }: { id: number }) {
    const user_info = (await getUser()) as { wish_list: (domain | hostService)[]; cart: (domain | hostService)[]; name: string } | undefined;

    return (
        <section className="w-dvw min-h-dvh flex flex-col justify-start items-start p-32">
            <Button url="/hosting" content="Back to Services" css="text-gray-400 hover:text-foreground flex flex-row-reverse gap-1 justify-start items-center mb-8" children_el={<Arrow s={25} css="rotate-180" color="currentColor" />} />
            <Service_display id={id ? +id : 1} user_info={user_info} />
        </section>
    );
}
