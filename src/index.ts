import { isString, isUndefined } from "bittydash";

export type TargetFile = File | Blob;
export type TypeOption = "arrayBuffer";
export type ObjOption = { type: TypeOption };

export type Options = TypeOption | ObjOption;

async function toArrayBuffer(file: TargetFile) {
  return await new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = reject;
    fileReader.onabort = reject;
    fileReader.readAsArrayBuffer(file);
  });
}

async function toAny(file: TargetFile, options?: Options) {
  const type = isUndefined(options)
    ? "arrayBuffer"
    : isString(options)
    ? options
    : (options as ObjOption).type;

  if (type === "arrayBuffer") {
    return toArrayBuffer(file);
  }

  throw new Error("Convert type is invalid");
}

export { toAny };
