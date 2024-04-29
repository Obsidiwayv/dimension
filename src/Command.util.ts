import type { Message, MessageContent } from "eris";

export default class CommandUtil {
    constructor(private message: Message) {}

    public async send(content: MessageContent) {
        try {
            return this.message.channel.createMessage(content);
        } catch (e) {
            console.log(e);
        }
    }

    public async succeed(content: string) {
        return await this.send(`:check: ${content}`);
    }

    public async error(content: string) {
        return await this.send(`:x: ${content}`);
    }
}