export default class {
    constructor(public s: string) {}

    /**
     * Chops up the string and returns an array, wrapping string.split()
     */
    public chop(split: RegExp | string, opt?: Quartz.StringChopOptions) {
        let current = this.s;
        if (opt && opt.slice) {
            current.slice(opt.slice);
        }
        return current.split(split).map(str => str.trim());
    }
}