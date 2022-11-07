import { isString } from "bittydash";
import { isArrayBuffer } from "bittydash";
import validDataUrl from "valid-data-url";
import { describe } from "vitest";
import { test, expect } from "vitest";
import { toAny, toArrayBuffer, toDataUrl, toText } from "../src/index";
const file = new File([], "test.mp3", { type: "audio/mpeg" });

describe("toAny", () => {
  test("arrayBuffer", async () => {
    const buffer = await toAny(file, "arrayBuffer");
    expect(isArrayBuffer(buffer)).toBe(true);
  });

  test("arrayBuffer options obj", async () => {
    const buffer = await toAny(file, { type: "arrayBuffer" });
    expect(isArrayBuffer(buffer)).toBe(true);
  });

  test("dataUrl", async () => {
    const url = await toAny(file, "dataUrl");
    expect(validDataUrl(url)).toBe(true);
  });

  test("text", async () => {
    const str = await toAny(file, "text");
    expect(isString(str)).toBe(true);
  });
});

test("toArrayBuffer", async () => {
  const buffer = await toArrayBuffer(file);
  expect(isArrayBuffer(buffer)).toBe(true);
});

test("toDataUrl", async () => {
  const buffer = await toDataUrl(file);
  expect(validDataUrl(buffer)).toBe(true);
});

test("toText", async () => {
  const buffer = await toText(file);
  expect(isString(buffer)).toBe(true);
});
