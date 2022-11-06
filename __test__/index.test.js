import { isString } from "bittydash";
import { isArrayBuffer } from "bittydash";
import validDataUrl from "valid-data-url";
import { test, expect } from "vitest";
import { toAny } from "../src/index";
const file = new File([], "test.mp3", { type: "audio/mpeg" });

test("toArrayBuffer", async () => {
  const buffer = await toAny(file, "arrayBuffer");
  expect(isArrayBuffer(buffer)).toBe(true);
});

test("toArrayBuffer options obj", async () => {
  const buffer = await toAny(file, { type: "arrayBuffer" });
  expect(isArrayBuffer(buffer)).toBe(true);
});

test("toDataUrl", async () => {
  const url = await toAny(file, "dataUrl");
  expect(validDataUrl(url)).toBe(true);
});

test("toText", async () => {
  const str = await toAny(file, "text");
  expect(isString(str)).toBe(true);
});
