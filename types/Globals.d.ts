type Json = { [k: string]: string }

type CommandData = {
    name: string;
}

type CommandCTX = {
    context: CommandData;
    
}

declare module "*.cmap" {
    export const private: Json = {};
    export const public: Json = {};
}