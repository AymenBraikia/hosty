import {} from "react";
import Users_panel from "./users_panel";

export default function Body() {
    return (
        <div className="flex flex-col gap-8 overflow-hidden">
            <div>
                <h1 className="text-4xl font-bold">Users</h1>
                <p className="text_shine">Manage All Users</p>
            </div>

            <Users_panel />
        </div>
    );
}
