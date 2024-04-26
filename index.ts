import * as config from "./config.cmap";
import { Client, Message } from "eris";
import Ready from "./events/Ready";
import MessageCreate from "./events/MessageCreate";
import { Glob } from "bun";
import type Command from "Command";
import type { CommandAll } from "types/Commands";
import { commands } from "global";

/// <refrence path="./types/Globals.d.ts"/>

const client = new Client(config.private["token"]);

client.on("ready", () => Ready.block());
client.on("messageCreate", (message: Message) => 
    MessageCreate.block([message, client]))

client.connect();
loadCommands();

async function loadCommands() {
    const files = new Glob("**/*.ts");

    for await (const file of files.scan("./commands")) {
        const command = require(`./commands/${file}`).default;
        console.log(command)
        commands.put(command.name, command);
    }
}