import Runnable from "@quartz/Runnable";
import * as config from "config.cmap";
import QuartzString from "@quartz/objects/QuartzString";
import { commands } from "global";
import type { MessageCreateEventArgs } from "types/Commands";
import type { GuildChannel } from "eris";

export default new Runnable(async ([message, client]: MessageCreateEventArgs) => {
    const content = new QuartzString(message.content);

    if (!message.content.startsWith(config.public["prefix"])) {
        return;
    }

    const [prefixed, ...args] = content.chop(" ");
    const commandArgs = prefixed.slice(config.public["prefix"].length);

    const command = commands.pull(commandArgs, () => null);

    if (command !== null) {
        const { execute, context } = command;

        const guild = (<GuildChannel>message.channel).guild;

        execute.block([{ context, message, client }, { guild }]);
    }
    
});