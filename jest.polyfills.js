// TextEncoder と TextDecoder を最初に設定
const { TextDecoder, TextEncoder, ReadableStream } = require("node:util");

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
});

const fetch = require("node-fetch");
global.fetch = fetch;
global.Response = fetch.Response;
global.Headers = fetch.Headers;
global.Request = fetch.Request;

console.log("TextEncoder after:", global.TextEncoder);
console.log("TextDecoder after:", global.TextDecoder);
