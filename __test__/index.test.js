import { isArrayBuffer } from "bittydash";
import { test, expect } from "vitest";
import { toAny } from "../src/index";
const file = new File([], "test.mp3", { type: "audio/mpeg" });

test("toArrayBuffer", async () => {
  const buffer = await toAny(file, "arrayBuffer");
  expect(isArrayBuffer(buffer)).toBe(true);
});
