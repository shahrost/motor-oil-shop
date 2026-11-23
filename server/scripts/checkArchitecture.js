// Local/CI structural checks. No application modules are loaded and no network is used.
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const serverOnly = process.argv.includes("--server");
const clientOnly = process.argv.includes("--client");
const roots = [
  ...(!clientOnly ? [path.join(root, "server")] : []),
  ...(!serverOnly ? [path.join(root, "client/src")] : []),
];
const ignored = new Set(["node_modules", "uploads", "assets", "build", "dist"]);
const files = [];
const sections = [];
const errors = [];
const dependencies = new Map();

function walk(directory) {
  if (!fs.existsSync(directory)) {
    errors.push(`Missing source directory: ${directory}`);
    return;
  }
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "sections") sections.push(file);
      walk(file);
    } else if (/\.(?:js|jsx)$/.test(entry.name)) files.push(file);
  }
}

function relative(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

function resolveImport(file, name) {
  const target = path.resolve(path.dirname(file), name.split("?")[0]);
  return ["", ".js", ".jsx", ".json", "/index.js", "/index.jsx"].map((extension) => path.normalize(target + extension)).find((candidate) => {
    try { return fs.statSync(candidate).isFile(); } catch { return false; }
  });
}

roots.forEach(walk);
const hookNames = new Map();
for (const file of files) {
  const name = relative(file);
  const source = fs.readFileSync(file, "utf8");
  // Static import/export sources and literal require()/import() calls.
  const imports = [...source.matchAll(/\bfrom\s*["']([^"']+)["']|\b(?:require|import)\s*\(\s*["']([^"']+)["']\s*\)|\bimport\s*["']([^"']+)["']/g)]
    .map((match) => match[1] || match[2] || match[3]);
  dependencies.set(file, []);
  for (const dependency of imports) {
    if (dependency.startsWith(".")) {
      const target = resolveImport(file, dependency);
      if (target) dependencies.get(file).push(target);
      else errors.push(`${name}: unresolved ${dependency}`);
    }
    if (/^server\/repositories\//.test(name) && /(?:^|\/)services\//.test(dependency)) errors.push(`${name}: repository imports a service`);
    if (/^server\/(?:services|controllers)\//.test(name) && /(?:^|\/)models\//.test(dependency)) errors.push(`${name}: database access must go through repositories`);
    if (/^client\/src\/(?:components|hooks|context|utils)\//.test(name) && !name.includes("/__tests__/") && /\/api\/apiClient(?:\.js)?$/.test(dependency)) errors.push(`${name}: API access must go through services`);
    if (name.startsWith("client/src/") && !name.includes("/sections/") && /\/sections\//.test(dependency)) errors.push(`${name}: parent must import the sections index`);
  }
  if (name.includes("/hooks/") && /^use/.test(path.basename(file))) {
    const hook = path.basename(file).replace(/\.(?:js|jsx)$/, "");
    if (hookNames.has(hook)) errors.push(`${name}: duplicate hook name ${hook} (${hookNames.get(hook)})`);
    hookNames.set(hook, name);
  }
  if (name.startsWith("client/src/pages/")) {
    const body = source.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, "");
    if (/\buse[A-Z]\w*\s*\(|\.(?:filter|map|reduce|sort|find)\s*\(|\b(?:const|let|var)\b/.test(body)) errors.push(`${name}: page must remain a route wrapper`);
    if (imports.some((dependency) => !dependency.includes("components/"))) errors.push(`${name}: page should import only its feature component`);
  }
}
for (const directory of sections) {
  if (!fs.existsSync(path.join(directory, "index.js"))) errors.push(`${relative(directory)}: missing index.js`);
}

// A test or a standalone maintenance script is not evidence of runtime use.
// Follow literal lazy imports too, so admin pages and on-demand data stay valid.
const runtimeFiles = new Set(files.filter((file) => !/(?:^|\/)(?:scripts|tests|test|__tests__)(?:\/|$)/.test(relative(file))));
const reachable = new Set();
function visit(file) {
  if (!runtimeFiles.has(file) || reachable.has(file)) return;
  reachable.add(file);
  for (const dependency of dependencies.get(file) || []) visit(dependency);
}
if (!serverOnly) visit(path.join(root, "client/src/main.jsx"));
if (!clientOnly) visit(path.join(root, "server/server.js"));
for (const file of runtimeFiles) {
  if (!reachable.has(file)) errors.push(`${relative(file)}: unreachable from the application entry points`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Architecture checks passed: ${files.length} source files, ${sections.length} sections, ${hookNames.size} unique hooks.`);
}
