import { RobloxRequest } from "@requests/roblox.request";
import type { UserSearchResponse } from "@requests/roblox.types";
import Command from "Command";

export default new Command("roblox", { subOnly: true })
    .setSubCommand("players", async ([_, handler]) => {
        const res = await handler.rest.make<UserSearchResponse[]>(new RobloxRequest(`/v1/users/search?keyword=${_.args[0]}`), {
            method: "GET"
        });

        if (typeof res === "string") {
            return handler.util.error(res);
        }

        const description: string[] = [];

        res.map((player) => { description.push(`${player.id} | ${player.name}, verified: ${player.hasVerifiedBadge}`) });

        handler.util.send({
            embed: { description: description.join("\n") }
        });
    });