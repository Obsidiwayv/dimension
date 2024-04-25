import * as config from "./config.cmap";
import { Client } from "eris";

const client = new Client(config.private["token"]);

client.connect();