import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pairs = [
  ["assets/snaps", "client/public/snaps"],
  ["assets/sounds", "client/public/sounds"],
];

for (const [src, dest] of pairs) {
  const from = join(root, src);
  const to = join(root, dest);
  if (!existsSync(from)) {
    console.warn(`Skip missing: ${from}`);
    continue;
  }
  mkdirSync(dirname(to), { recursive: true });
  cpSync(from, to, { recursive: true, filter: (p) => !p.endsWith(".psd") && !p.endsWith(".jpg") || p.includes("client/public") });
  console.log(`Copied ${src} -> ${dest}`);
}
