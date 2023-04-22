import { isArrayBuffer, isBlob, isString } from "bittydash";
import validDataUrl from "valid-data-url";
import { describe, test, expect } from "vitest";
import {
  toAny,
  toArrayBuffer,
  toDataUrl,
  toText,
  toBlob,
  toBinaryString,
} from "../src/index";
const file = new File([], "test.mp3", { type: "audio/mpeg" });
const textFile = new File(["hello world"], "hello.txt", { type: "txt" });

describe("toAny", () => {
  test("arrayBuffer", async () => {
    const buffer = await toAny(file, "arrayBuffer");
    expect(isArrayBuffer(buffer)).toBe(true);
  });

  test("binaryString", async () => {
    const bs = await toAny(file, "binaryString");
    expect(isString(bs)).toBe(true);
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
    const str = await toAny(textFile, "text", "utf-8");
    expect(str).toBe("hello world");
  });

  test("toBlob", async () => {
    const newBlob = await toAny(file, "blob");
    expect(isBlob(newBlob)).toBe(true);
  });
});

test("toArrayBuffer", async () => {
  const buffer = await toArrayBuffer(file);
  expect(isArrayBuffer(buffer)).toBe(true);
});

test("toBinaryString", async () => {
  const bs = await toBinaryString(file);
  expect(isString(bs)).toBe(true);
});

test("toDataUrl", async () => {
  const url = await toDataUrl(file);
  expect(validDataUrl(url)).toBe(true);
});

test("toText", async () => {
  const str = await toText(textFile, "utf-8");
  expect(str).toBe("hello world");
});

test("toBlob", async () => {
  const newBlob = await toBlob(file);
  expect(isBlob(newBlob)).toBe(true);
});
