const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { createRequire } = require("node:module");

// Run the real CommonJS service with isolated I/O dependencies, without loading server.js/.env.
module.exports = function loadService(relativePath, mocks) {
  const filename = path.resolve(__dirname, "../..", relativePath);
  const realRequire = createRequire(filename);
  const module = { exports: {} };
  vm.runInNewContext(fs.readFileSync(filename, "utf8"), {
    module,
    exports: module.exports,
    require: (name) => Object.hasOwn(mocks, name) ? mocks[name] : realRequire(name),
    console,
  }, { filename });
  return module.exports;
};
