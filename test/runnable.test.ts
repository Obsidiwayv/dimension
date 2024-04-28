import Runnable from "@quartz/Runnable";
import { test, expect } from "bun:test";

test("runnable test", () => {
    const run = new Runnable(([arg]: [string]) => {
        expect(arg).toBe("done")
        expect(arg).toBeString();
    });
    run.block(["done"]);
});