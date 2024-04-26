import Runnable from "@quartz/Runnable";
import * as config from "config.cmap";
import QuartzString from "@quartz/objects/QuartzString";
import { commands } from "global";
import { LibraryHelper } from "@quartz/Library";
import type { MessageCreateEventArgs } from "types/Commands";

export default new Runnable(async ([message, client]: MessageCreateEventArgs) => {
    const content = new QuartzString(message.content);

    console.log(!message.content.startsWith(config.public["prefix"]), message.content, config)

    if (!message.content.startsWith(config.public["prefix"])) {
        return;
    }

    const [prefixed, ...args] = content.chop(" ");
    const commandArgs = args.slice(config.public["prefix"].length);
    console.log(commandArgs)

    const command = commands.pull(commandArgs[0], () => null);
    console.log(command)

    if (command !== null) {
        const { execute, context } = command;

        execute.block([{ context, message, client }]);
    }
    
});