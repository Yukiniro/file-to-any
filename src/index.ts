import { isString, isUndefined } from "bittydash";

export type TargetFile = File | Blob;
export type TypeOption = "arrayBuffer" | "dataUrl" | "text";
export type ObjOption = { type: TypeOption };

export type Options = TypeOption | ObjOption;

async function toTarget(
  file: TargetFile,
  type: TypeOption
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
        fileReader.readAsText(file);
        break;
      default:
        reject(new Error("Type is invalid"));
    }
  });
}

async function toArrayBuffer(file: TargetFile): Promise<ArrayBuffer> {
  return (await toTarget(file, "arrayBuffer")) as ArrayBuffer;
}

async function toDataUrl(file: TargetFile): Promise<string> {
  return (await toTarget(file, "dataUrl")) as string;
}

async function toText(file: TargetFile): Promise<string> {
  return (await toTarget(file, "text")) as string;
}

async function toAny(file: TargetFile, options?: Options) {
  const type = isUndefined(options)
    ? "arrayBuffer"
    : isString(options)
    ? options
    : (options as ObjOption).type;
  return await toTarget(file, type as unknown as TypeOption);
}

export { toArrayBuffer, toDataUrl, toText, toAny };
