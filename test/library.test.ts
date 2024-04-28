import { Library } from "@quartz/Library";
import { expect, test } from "bun:test";

const return_value = "test";

test("library test", () => {
    const library = new Library<string>();
    library.put("this", "test");

    expect(library.pull("this", () => null)).toBe(return_value)
})