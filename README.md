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
