type Json = { [k: string]: string }

declare module "*.cmap" {
    export const private: Json = {};
    export const public: Json = {};
}