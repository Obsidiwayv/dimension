import * as config from "./config.cmap";
import { Client, Message } from "eris";
import Ready from "./events/Ready";
import MessageCreate from "./events/MessageCreate";

const client = new Client(config.private["token"]);

client.on("ready", () => Ready.block());
client.on("messageCreate", (message: Message) => 
    MessageCreate.block(message))

client.connect();