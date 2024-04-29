import Command from "Command";
import colourUtil from "src/colour/colour.util";

export default new Command("color", {})
    .setRunnable(([_, handler]) => {
        const rgb = colourUtil.getRGB("Ff0000");
        const xyz = colourUtil.getXYZ(rgb);
        handler.util.send(`${xyz}`);
    });