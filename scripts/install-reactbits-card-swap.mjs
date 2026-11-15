/**
 * Install the OFFICIAL Card Swap from the React Bits shadcn registry and map
 * its generated path to the stable SapiHive ServicesSection import.
 * Run from the root of the SapiHive Next.js app: node scripts/install-reactbits-card-swap.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const cwd = process.cwd();
const componentsConfig = path.join(cwd, "components.json");
if (!fs.existsSync(path.join(cwd, "package.json"))) {
  throw new Error("Run this command from the sapihive project folder (containing package.json).");
}

if (!fs.existsSync(componentsConfig)) {
  fs.writeFileSync(componentsConfig, JSON.stringify({
    "$schema": "https://ui.shadcn.com/schema.json",
    "style": "new-york",
    "rsc": true,
    "tsx": true,
    "tailwind": { "config": "", "css": "src/app/globals.css", "baseColor": "zinc", "cssVariables": true, "prefix": "" },
    "aliases": { "components": "@/components", "utils": "@/lib/utils", "ui": "@/components/ui", "lib": "@/lib", "hooks": "@/hooks" }
  }, null, 2) + "\n");
  console.log("Created components.json (the project did not have one).");
}

console.log("Installing official React Bits Card Swap...");
execSync('pnpm dlx shadcn@latest add "https://reactbits.dev/r/CardSwap-TS-TW.json" --yes', { cwd, stdio: "inherit", shell: true });

const adapter = path.join(cwd, "src/features/services/components/CardSwap.tsx");
const candidates = [];
function scan(dir, depth = 0) {
  if (depth > 8 || !fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".next", ".git"].includes(e.name)) continue;
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) scan(fp, depth + 1);
    else if (/^card[-_]?swap\.(tsx|jsx)$/i.test(e.name) && path.resolve(fp) !== path.resolve(adapter)) candidates.push(fp);
  }
}
scan(path.join(cwd, "src"));
scan(path.join(cwd, "components"));

const valid = candidates.filter(fp => {
  const content = fs.readFileSync(fp, "utf8");
  return /CardSwap|card-swap/.test(content) && /export/.test(content);
});

if (!valid.length) {
  throw new Error("The CLI finished, but CardSwap.tsx could not be located. Check the shadcn CLI output before continuing.");
}
const installed = valid[0];
let rel = path.relative(path.dirname(adapter), installed).replaceAll(path.sep, "/").replace(/\.(tsx|jsx)$/i, "");
if (!rel.startsWith(".")) rel = "./" + rel;
fs.mkdirSync(path.dirname(adapter), {recursive: true});
fs.writeFileSync(adapter, `// React Bits Card Swap — source installed via its official registry.\nexport { default, Card } from ${JSON.stringify(rel)};\n`);
console.log("\nCard Swap ready. Connected official component:", installed);
console.log("Now run: pnpm dev");
