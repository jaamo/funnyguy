import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { FunnyGuy } from "../dist/index.js";

const pose = process.argv[2] || "angry";
const svg = renderToStaticMarkup(React.createElement(FunnyGuy, { pose, size: 360 }));
process.stdout.write(
  `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:0;background:#eaf6ff;display:grid;place-items:center;height:100vh}</style></head><body>${svg}</body></html>`
);
