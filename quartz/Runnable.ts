import Catch from "./Catch";

/**
 * A basic runnable for error handling
 */
export default class Runnable<T> {
    private runnables: Quartz.RunnableFunction<T>[] = [];

    constructor(private cb: (...args: T[]) => any) {}

    /**
     * Mono.block() but executes the next function if specified
     * @link https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Mono.html#block--
     */
    public async block(...args: T[]) {
        try {
            
            if (this.runnables.length) {
                const r = this.runnables.reverse().pop();
                if (r) {
                    this.cb = r;
                    this.block(...args);
                    return;
                }
            }
            return this.cb(...args);
        } catch (e: any) {
            console.log(e)
            return new Catch(e);
        }
    }
    /**
     * Will execute the next runnable when finished
     */
    public queue(func: Quartz.RunnableFunction<T>) {
        this.runnables.push(func);
    }

    public get length() {
        return this.runnables.length;
    }
}