# file-to-any

![NPM](https://img.shields.io/npm/l/file-to-any?color=blue&style=flat-square) ![npm](https://img.shields.io/npm/v/file-to-any?color=blue&style=flat-square)

The `file-to-any` is a tiny library that could convert file to arraybuffer, dataUrl and text

## Intall

```shell
npm i file-to-any -S
```

or

```shell
pnpm add file-to-any -S
```

## Useage

Here is a simple [demo](https://react-ts-dsbxwk.stackblitz.io).

```javascript
import { toAny } from "file-to-any";

// You can get file by input tag with type that is file
toAny(file, "arrayBuffer").then((value) => {
  console.log(value); // value is a arrayBuffer
});
```

## API

### toAny

The all-purpose api to convert file to others.

- Params
  - `file` **Blob | File** The file to convert.
  - `options` **"arrayBuffer" | "dataUrl" | "text" | object**
    - `options.type` **"arrayBuffer" | "dataUrl" | "text"**
- Returns
  - `Promise<any>` Returns the associated result according to the specified parameter.

### toArrayBuffer

Convert file to [arrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer).

- Params
  - `file` **Blob | File** The file to convert.
  - Returns
    - `Promise<ArrayBuffer>` Returns a arrayBuffer.

### toDataUrl

Convert file to [dataUrl](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Data_URLs).

- Params
  - `file` **Blob | File** The file to convert.
  - Returns
    - `Promise<string>` Returns a dataUrl.

### toText

Convert file to string.

- Params
  - `file` **Blob | File** The file to convert.
  - Returns
    - `Promise<string>` Returns a string.
