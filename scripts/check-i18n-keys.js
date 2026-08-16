#!/usr/bin/env node
// CI check: every locale in i18n.js's `translations` must have the exact same
// key set. Catches a typo'd/missing/extra key that the runtime console.warn
// in setLanguage() would otherwise only surface to a real user of that locale.

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const i18nPath = path.join(__dirname, "..", "i18n.js");
const code = fs.readFileSync(i18nPath, "utf8");
const sandbox = {
  console,
  // i18n.js registers a DOMContentLoaded listener at load time; stub just
  // enough to let the file evaluate so we can read `translations` back out.
  document: { addEventListener: function () {}, getElementById: function () { return null; } },
  localStorage: { getItem: function () { return null; }, setItem: function () {} },
  navigator: { language: "en-US" },
};
vm.createContext(sandbox);
vm.runInContext(code + "\n;globalThis.translations = translations;", sandbox, { filename: i18nPath });

const translations = sandbox.translations;
const locales = Object.keys(translations);
const keysets = {};
locales.forEach((locale) => {
  keysets[locale] = new Set(Object.keys(translations[locale]));
});

const allKeys = new Set();
locales.forEach((locale) => keysets[locale].forEach((k) => allKeys.add(k)));

let failed = false;
locales.forEach((locale) => {
  const missing = [...allKeys].filter((k) => !keysets[locale].has(k));
  if (missing.length) {
    failed = true;
    console.error(`[${locale}] missing ${missing.length} key(s): ${missing.join(", ")}`);
  }
});

if (failed) {
  console.error("\ni18n key parity check FAILED — see missing keys above.");
  process.exit(1);
}

console.log(`i18n key parity OK — ${locales.length} locales, ${allKeys.size} keys each.`);
