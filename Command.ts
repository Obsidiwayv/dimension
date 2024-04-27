import Runnable from "./quartz/Runnable";
import ObjectFactory from "@quartz/factory/ObjectFactory";
import type { CommandCTX, CommandData } from "types/Commands";
import type { Client, Guild, Message } from "eris";

export type CTX = [{
    message: Message;
    client: Client;
    context: CommandData;
}, {
    guild: Guild;
}];

export default class extends ObjectFactory<CommandData> {
    private callback!: Runnable<CTX>;

    constructor(public name: string, public command: CommandData) {
        super()
    }

    public setRunnable(cb: (ctx: CTX) => any) {
        this.callback = new Runnable(cb);
        return this;
    }

    public build() {
        return {
            name: this.name,
            context: this.command,
            execute: this.callback
        }
    }
}