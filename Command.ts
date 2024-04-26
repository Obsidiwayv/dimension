import type { Asyncify } from "type-fest";
import Runnable from "./quartz/Runnable";
import ObjectFactory from "@quartz/factory/ObjectFactory";
import type { CommandCTX, CommandData } from "types/Commands";
import type { Client, Message } from "eris";

type CTX = [{message: Message, client: Client}];

export default class extends ObjectFactory<CommandData> {
    private callback!: Runnable<CTX>;

    constructor(public command: CommandData) {
        super()
    }

    public setRunnable(cb: (ctx: CTX) => any) {
        this.callback = new Runnable(cb);
        return this;
    }

    public build() {
        return {
            ...this.command,
            execute: this.callback
        }
    }
}