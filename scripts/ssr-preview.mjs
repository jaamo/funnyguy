import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { FunnyGuy } from "../dist/index.js";

const poses = ["idle", "wave", "cheer", "think"];
const cells = poses
  .map(
    (p) =>
      `<div class="cell"><span>${p}</span>${renderToStaticMarkup(
        React.createElement(FunnyGuy, { pose: p, size: "34vh" })
      )}</div>`
  )
  .join("");

// one colored instance to prove `color` recolors body + derived shadow
const colored = renderToStaticMarkup(
  React.createElement(FunnyGuy, { pose: "cheer", color: "#f59e0b", size: "34vh" })
);

process.stdout.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><style>
body{margin:0;background:#eaf6ff;font-family:system-ui;display:grid;grid-template-columns:1fr 1fr;gap:0}
.cell{display:grid;place-items:center;height:50vh;position:relative}
.cell span{position:absolute;top:8px;left:12px;color:#0b3a57;font-weight:700}
</style></head><body>${cells}<div class="cell"><span>cheer (color)</span>${colored}</div></body></html>`);
