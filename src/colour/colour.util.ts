import { hexadecimal } from "./colour.keys";

export default class {

    // this splits up the hex into 3 seperate parts
    public static splitHexadecimal(h: string) {
        return {
            red: [h[0].toUpperCase() as keyof typeof hexadecimal, h[1].toUpperCase() as keyof typeof hexadecimal],
            green: [h[2].toUpperCase() as keyof typeof hexadecimal, h[3].toUpperCase() as keyof typeof hexadecimal],
            blue: [h[4].toUpperCase() as keyof typeof hexadecimal, h[5].toUpperCase() as keyof typeof hexadecimal]
        }
    }

    public static getRGB(hex: string) {
        const { red, green, blue } = this.splitHexadecimal(hex);

        // These are the real values
        // https://www.pixel2life.com/publish/tutorials/164/using_php_to_convert_between_hex_and_rgb_values/
        // We will call the first character's value x, and we will call the second character's value y. 
        // Here's the simple math formula you use to get the RGB value.
        // Reds = ( x * 16 ) + y
        const _red = (hexadecimal[red[0]] * 16) + hexadecimal[red[1]];
        const _green = (hexadecimal[green[0]] * 16) + hexadecimal[green[1]];
        const _blue = (hexadecimal[blue[0]] * 16) + hexadecimal[green[1]];

        return [_red, _green, _blue];
    }

    public static getLab(colour: string | number[]) {
        if (!Array.isArray(colour)) {
            colour = this.getRGB(colour);
        };

        
    }

    public static getXYZ(col: number[]) {
        let _r = (col[0] / 255);
        let _g = (col[1] / 255);
        let _b = (col[2] / 255);

        if (_r > 0.04045) {
            _r = Math.pow(((_r + 0.055) / 1.055), 2.4);
        } else {
            _r = _r / 12.92;
        }

        if (_g > 0.04045) {
            _g = Math.pow(((_g + 0.055) / 1.055), 2.4);
        } else {
            _g = _g / 12.92;
        }

        if (_b > 0.04045) {
            _b = Math.pow(((_b + 0.055) / 1.055), 2.4);
        } else {
            _b = _b / 12.92;
        }

        _r = _r * 100;
        _g = _g * 100;
        _b = _b * 100;

        const X = _r * 0.4124 + _g * 0.3576 + _b * 0.1805;
        const Y = _r * 0.2126 + _g * 0.7152 + _b * 0.0722;
        const Z = _r * 0.0193 + _g * 0.1192 + _b * 0.9505;

        return [X, Y, Z]
    }
}