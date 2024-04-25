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
                }

                if (l === "") {
                    continue;
                } else if (l.startsWith("$")) {
                    continue;
                }

                const [key, value] = l.split(':').map(part => part.trim())

                if (l !== "}") {
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