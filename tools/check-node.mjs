#!/usr/bin/env node
// Preflight node-version guard. Runs from `predev` / `prebuild` hooks so
// scripts fail fast with an actionable message instead of a 50-line
// `util.styleText is not a function` stack trace from a transitive dep
// that uses a Node 22+ API.
//
// The required version comes from `.nvmrc` so the script and the version
// file can't drift.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const nvmrcPath = path.resolve(here, "..", ".nvmrc");

let want;
try {
  want = readFileSync(nvmrcPath, "utf8").trim();
} catch {
  // No .nvmrc? Skip the guard rather than fail.
  process.exit(0);
}

const want3 = want.split(".").map(Number);
const have3 = process.versions.node.split(".").map(Number);

const cmp = (a, b) => {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const av = a[i] ?? 0;
    const bv = b[i] ?? 0;
    if (av !== bv) return av - bv;
  }
  return 0;
};

// Only require the major-version match; patch versions drift constantly
// and pinning them would flag every minor nvm update as a failure.
if (have3[0] < want3[0]) {
  const red = "\x1b[31m";
  const reset = "\x1b[0m";
  const dim = "\x1b[2m";
  process.stderr.write(
    `\n${red}Node ${process.versions.node} is too old — this repo needs Node ${want}.${reset}\n` +
      `${dim}The Module Federation plugin (@module-federation/manifest) uses\n` +
      `util.styleText, which was added in Node 22. Running on an older Node\n` +
      `produces an unreadable stack trace before the dev server starts.${reset}\n\n` +
      `Fix it in this shell:\n` +
      `  ${dim}cd${reset} ${path.resolve(here, "..")}\n` +
      `  ${dim}nvm use${reset}\n\n` +
      `Or pin once for this directory (zsh):\n` +
      `  ${dim}autoload -U add-zsh-hook${reset}\n` +
      `  ${dim}add-zsh-hook chpwd () { [ -f .nvmrc ] && nvm use --silent }${reset}\n\n`,
  );
  process.exit(1);
}
