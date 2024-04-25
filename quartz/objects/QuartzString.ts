export default class {
    constructor(public s: string) {}

    /**
     * Chops up the string and returns an array, wrapping string.split()
     */
    public chop(split: RegExp | string) {
        return this.s.split(split).map(str => str.trim());
    }
}