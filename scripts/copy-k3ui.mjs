import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const k3uiDist = "c:/wamp64/www/k3ui/dist";
const target = join(root, "client/public/k3ui");

const files = [
  ["js/k3ui.min.js", "k3ui.min.js"],
  ["css/k3ui.min.css", "k3ui.min.css"],
  ["js/init-sample.js", "init.js"],
  ["js/init.js", "init.js"],
];

mkdirSync(target, { recursive: true });

let copiedInit = false;
for (const [src, dest] of files) {
  const from = join(k3uiDist, src);
  const to = join(target, dest);
  if (existsSync(from)) {
    copyFileSync(from, to);
    console.log(`Copied ${dest}`);
    if (dest === "init.js") copiedInit = true;
  }
}

if (!copiedInit) {
  const fallback = join(target, "init.js");
  if (!existsSync(fallback)) {
    writeFileSync(fallback, "window.K3UI_OPTIONS = window.K3UI_OPTIONS || {};\n");
    console.log("Created init.js fallback");
  }
}
