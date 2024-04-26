import Command from "Command";

export default new Command({
    name: "ping"
})
.setRunnable( (ctx) => {
    console.log("thew")
    ctx.message.channel.createMessage("hi");
})
.build();