import Command from "Command";
import ms from "ms";

export default new Command("ping", {})
    .setRunnable(([_, { util }]) => {
        const diff = Date.now();

        util.send("ping?")
            .then(msg => {
                const now = (Date.now() - diff);

                if (msg) {
                    msg.edit(`Pong! \`${now} milliseconds (${ms(now * 7)})\``);
                }
            })
    });