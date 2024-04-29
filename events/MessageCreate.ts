import Runnable from "@quartz/Runnable";
import * as config from "config.cmap";
import QuartzString from "@quartz/objects/QuartzString";
import { commands } from "global";
import type { MessageCreateEventArgs } from "types/Commands";
import type { GuildChannel } from "eris";
import CommandUtil from "src/Command.util";
import RequestHandler from "@quartz/handlers/request.handler";

export default new Runnable(async ([message, client]: MessageCreateEventArgs) => {
    const content = new QuartzString(message.content);

    if (!message.content.startsWith(config.public["prefix"])) {
        return;
    }

    let [prefixed, ...args] = content.chop(" ");
    const commandArgs = prefixed.slice(config.public["prefix"].length);

    const command = commands.pull(commandArgs, () => null);

    if (command !== null) {
        let { execute, context } = command;
        const subcommand = command.sub.find(({ name }) => args[0] === name);

        const guild = (<GuildChannel>message.channel).guild;
        const util = new CommandUtil(message);
        const rest = new RequestHandler();
        const shards = client.shards.values();

        if (subcommand) {
            args = args.slice(1);
            execute = subcommand.execute;
        } else {
            if (command.context.subOnly) {
                util.send(`This command only has subcommands... \`${command.sub.map(v => v.name).join(", ")}\``);
                return;
            }
        }


        execute.block([{ context, message, client, shards, guild, args }, { util, rest }]);
    }
    
});