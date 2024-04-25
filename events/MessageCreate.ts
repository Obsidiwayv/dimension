import type { Message } from "eris";
import Runnable from "@quartz/Runnable";
import * as config from "config.cmap";
import QuartzString from "@quartz/objects/QuartzString";

export default new Runnable((message: Message) => {
    const content = new QuartzString(message.content);
    
    if (!message.content.startsWith(config.public["prefix"])) {
        return;
    }

    const [] = new QuartzString(message.content);
});