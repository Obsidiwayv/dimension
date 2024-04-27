import { plugin } from "bun";

export default await plugin({
    name: "config parser",
    async setup(build) {
        build.onLoad({ filter: /\.cmap$/ }, async (args) => {
            const file = await Bun.file(args.path).text();
            const lines = file.split("\n");

            const json = {
                private: {} as Json,
                public: {} as Json
            };
            let isPrivate = true;

            for (let l of lines) {
                l = l.trim();
            
                if (l.startsWith(".public")) {
                    isPrivate = false;
                    continue; // Skip processing the .public line itself
                }
            
                if (l === "") {
                    continue;
                } else if (l.startsWith("$")) {
                    continue;
                }
            
                if (l === "}") {
                    continue;
                }
            
                const separatorIndex = l.indexOf(':');
                if (separatorIndex === -1) {
                    continue; // Skip lines without a valid key-value separator
                }
            
                const key = l.slice(0, separatorIndex).trim();
                const value = l.slice(separatorIndex + 1).trim();
            
                if (key === 'prefix') {
                    json.public[key] = value; // Always put 'prefix' in the public section
                } else {
                    json[isPrivate ? "private" : "public"][key] = value;
                }
            }

            return {
                loader: "object",
                exports: json
            }
        })
    }
})