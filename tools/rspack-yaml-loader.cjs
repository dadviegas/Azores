// Tiny rspack loader: parses a .yaml/.yml file and emits an ES module whose
// default export is the parsed JS object. Used by every app that bundles
// `@azores/widgets` (via its source manifests). No runtime YAML parsing
// happens in the browser — manifests resolve to plain JSON at build time.

"use strict";

const yaml = require("yaml");

module.exports = function (source) {
  this.cacheable && this.cacheable();
  let parsed;
  try {
    parsed = yaml.parse(source);
  } catch (err) {
    const where = this.resourcePath || "<yaml>";
    throw new Error(`yaml-loader: failed to parse ${where}: ${err.message}`);
  }
  return `export default ${JSON.stringify(parsed)};`;
};
