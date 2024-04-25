import type { Asyncify } from "type-fest";
import Runnable from "./quartz/Runnable";
import ObjectFactory from "@quartz/factory/ObjectFactory";

export default class extends ObjectFactory<CommandData> {
    private callback!: Runnable<CommandCTX>;

    constructor(public command: CommandData) {
        super();
    }

    public setRunnable(cb: Asyncify<(ctx: CommandCTX) => Promise<void>>) {
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