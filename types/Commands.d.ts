import type Runnable from "@quartz/Runnable";
import type { Client, EmbedOptions, Message } from "eris";
import type { ConditionalPick } from "type-fest";

export type CommandData = {
    name: string;
}

export type CommandCTX = {
    context: CommandData;
    message: Message;
    client: Client;
}

export type CommandFunc = {
    execute: Runnable<[CommandCTX]>;
};

export type MessageCreateEventArgs = [Message, Client];

export interface CommandAll extends CommandFunc, CommandCTX {}