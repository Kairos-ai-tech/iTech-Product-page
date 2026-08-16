#!/usr/bin/env node
// CI check, three parts:
// 1. Every locale in i18n.js's `translations` must have the exact same key
//    set. Catches a typo'd/missing/extra key that the runtime console.warn
//    in setLanguage() would otherwise only surface to a real user of that
//    locale.
// 2. Every data-i18n*/data-i18n-placeholder/-alt/-aria-label key referenced
//    in index.html must exist in translations (checked against zh-TW, the
//    base locale) — catches a typo'd key in the markup itself.
// 3. index.html's static no-JS <option value="..."> fallback list must list
//    exactly the same languages as translations — populateLangSelect()
//    rebuilds the select for JS users, but this static list is a separate,
//    hand-maintained fallback nothing else keeps in sync.

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const repoRoot = path.join(__dirname, "..");
const i18nPath = path.join(repoRoot, "i18n.js");
const htmlPath = path.join(repoRoot, "index.html");
const code = fs.readFileSync(i18nPath, "utf8");
const html = fs.readFileSync(htmlPath, "utf8");
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

// --- 1. cross-locale key parity ---
locales.forEach((locale) => {
  const missing = [...allKeys].filter((k) => !keysets[locale].has(k));
  if (missing.length) {
    failed = true;
    console.error(`[${locale}] missing ${missing.length} key(s): ${missing.join(", ")}`);
  }
});

// --- 2. index.html data-i18n* keys exist in translations ---
const baseLocale = translations[locales[0]];
const attrPattern = /data-i18n(?:-placeholder|-alt|-aria-label)?="([^"]+)"/g;
const htmlKeys = new Set();
let m;
while ((m = attrPattern.exec(html))) htmlKeys.add(m[1]);
const missingFromTranslations = [...htmlKeys].filter((k) => !(k in baseLocale));
if (missingFromTranslations.length) {
  failed = true;
  console.error(`index.html references key(s) not in translations: ${missingFromTranslations.join(", ")}`);
}

// --- 3. static no-JS <option> fallback matches translations' languages ---
const selectMatch = html.match(/<select id="langSelect"[^>]*>([\s\S]*?)<\/select>/);
if (selectMatch) {
  const optionLangs = [...selectMatch[1].matchAll(/<option value="([^"]+)"/g)].map((mm) => mm[1]);
  const optionSet = new Set(optionLangs);
  const localeSet = new Set(locales);
  const missingFromOptions = locales.filter((l) => !optionSet.has(l));
  const extraInOptions = optionLangs.filter((l) => !localeSet.has(l));
  if (missingFromOptions.length || extraInOptions.length) {
    failed = true;
    if (missingFromOptions.length) {
      console.error(`#langSelect's static <option> fallback is missing: ${missingFromOptions.join(", ")}`);
    }
    if (extraInOptions.length) {
      console.error(`#langSelect's static <option> fallback has language(s) not in translations: ${extraInOptions.join(", ")}`);
    }
  }
} else {
  failed = true;
  console.error("Could not find <select id=\"langSelect\"> in index.html");
}

if (failed) {
  console.error("\ni18n check FAILED — see errors above.");
  process.exit(1);
}

console.log(`i18n check OK — ${locales.length} locales, ${allKeys.size} keys each, index.html and #langSelect in sync.`);
