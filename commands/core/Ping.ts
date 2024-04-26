import Command from "Command";
import ms from "ms";

export default new Command({
    name: "ping"
})
.setRunnable( ([{ message }]) => {
    const diff = Date.now();

    message.channel.createMessage("ping?")
        .then(msg => {
            const now = (Date.now() - diff);

            msg.edit(`Pong! \`${now} milliseconds (${ms(now * 7)})\``)
        })
})
.build();