import Runnable from "./quartz/Runnable";
import ObjectFactory from "@quartz/factory/ObjectFactory";
import type { CommandData } from "types/Commands";
import type { Client, Guild, Message, Shard } from "eris";
import type CommandUtil from "src/Command.util";
import type RequestHandler from "@quartz/handlers/request.handler";

export type CTX = [{
    message: Message;
    client: Client;
    context: CommandData;
    shards: IterableIterator<Shard>;
    guild: Guild;
    args: string[];
}, {
    util: CommandUtil;
    rest: RequestHandler;
}];

export default class extends ObjectFactory<CommandData> {
    private callback!: Runnable<CTX>;
    private subcommands: Array<{ name: string; execute: Runnable<CTX>; }> = [];

    constructor(public name: string, public command: CommandData) {
        super()
    }

    public setRunnable(cb: (ctx: CTX) => any) {
        this.callback = new Runnable(cb);
        return this;
    }

    public setSubCommand(name: string, cb: (ctx: CTX) => any) {
        this.subcommands.push({ name, execute: new Runnable(cb) });
        return this;
    }

    public build() {
        return {
            name: this.name,
            context: this.command,
            execute: this.callback,
            sub: this.subcommands
        }
    }
}