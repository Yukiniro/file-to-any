import { isString, isUndefined, isBlob } from "bittydash";

export type TargetFile = File | Blob;
export type TypeOption = "arrayBuffer" | "dataUrl" | "text" | "binaryString" | "blob" | "objectUrl";
export type ObjOption = { type: TypeOption; encoding?: string };

export type Options = TypeOption | ObjOption;

async function transformWithFileReader(
  file: TargetFile,
  type: TypeOption,
  encoding?: string,
): Promise<string | ArrayBuffer> {
  return await new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = reject;
    fileReader.onabort = reject;
    switch (type) {
      case "arrayBuffer":
        fileReader.readAsArrayBuffer(file);
        break;
      case "dataUrl":
        fileReader.readAsDataURL(file);
        break;
      case "text":
        fileReader.readAsText(file, encoding);
        break;
      case "binaryString":
        fileReader.readAsBinaryString(file);
        break;
      default:
        reject(new Error("Type is invalid"));
    }
  });
}

async function toArrayBuffer(file: TargetFile): Promise<ArrayBuffer> {
  if (file.arrayBuffer) {
    return await file.arrayBuffer();
  }
  return (await transformWithFileReader(file, "arrayBuffer")) as ArrayBuffer;
}

async function toBinaryString(file: TargetFile): Promise<ArrayBuffer> {
  return (await transformWithFileReader(file, "binaryString")) as ArrayBuffer;
}

async function toDataUrl(file: TargetFile): Promise<string> {
  return (await transformWithFileReader(file, "dataUrl")) as string;
}

async function toText(file: TargetFile, encoding?: string): Promise<string> {
  return (await transformWithFileReader(file, "text", encoding)) as string;
}

async function toAny(file: TargetFile, options?: Options, encoding?: string) {
  const type = isUndefined(options) ? "arrayBuffer" : isString(options) ? options : (options as ObjOption).type;

  const textEncoding = isUndefined(options)
    ? undefined
    : isString(options)
      ? encoding
      : (options as ObjOption).encoding;

  if (type === "blob") {
    return await toBlob(file);
  }

  if (type === "objectUrl") {
    return await toObjectUrl(file);
  }

  return await transformWithFileReader(file, type as unknown as TypeOption, textEncoding);
}

async function toBlob(file: TargetFile): Promise<Blob> {
  if (isBlob(file)) {
    return file;
  }
  return file.slice();
}

async function toObjectUrl(params: TargetFile): Promise<string> {
  return URL.createObjectURL(params);
}

export { toArrayBuffer, toBinaryString, toDataUrl, toText, toBlob, toObjectUrl, toAny };
