#!/usr/bin/env node
// CI check:
// 1. Every locale in i18n.js's `translations` must have the exact same key
//    set. Catches a typo'd/missing/extra key that the runtime console.warn
//    in setLanguage() would otherwise only surface to a real user of that
//    locale.
// 2. Every data-i18n*/data-i18n-placeholder/-alt/-aria-label key referenced
//    in index.html must exist in translations (checked against zh-TW, the
//    base locale) — catches a typo'd key in the markup itself. The set of
//    supported data-i18n* attribute suffixes is read out of i18n.js's own
//    setLanguage() selector (not hand-duplicated here), so adding a new
//    attribute type to setLanguage() extends this check automatically.
// 3. index.html's static no-JS <option value="..."> fallback list must list
//    exactly the same language codes AND display text as translations/
//    LANG_LABELS — populateLangSelect() rebuilds the select for JS users,
//    but this static list is a separate, hand-maintained fallback nothing
//    else keeps in sync.
// 4. i18n.js's LANG_LABELS object must have exactly the same locale keys as
//    translations — a 3rd hand-maintained list (display names) that nothing
//    else keeps in sync.
// 5. Runtime smoke test: actually fire i18n.js's DOMContentLoaded listener
//    and call setLanguage() for every locale against a minimal fake DOM,
//    to catch a throwing bug in populateLangSelect()/initLanguage()/
//    setLanguage() itself — parts 1-4 only validate the static data.

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
vm.runInContext(code + "\n;globalThis.translations = translations; globalThis.LANG_LABELS = LANG_LABELS;", sandbox, { filename: i18nPath });

const translations = sandbox.translations;
const langLabels = sandbox.LANG_LABELS;
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
// Pull the attribute suffix list out of i18n.js's own setLanguage() selector
// instead of hand-duplicating it, so a new attribute type added there is
// automatically covered here too.
const baseLocale = translations[locales[0]];
const selectorMatch = code.match(/\.querySelectorAll\(\s*"([^"]+)"\s*\)/);
if (!selectorMatch) {
  failed = true;
  console.error("Could not find setLanguage()'s querySelectorAll selector in i18n.js");
}
const attrNames = selectorMatch
  ? [...selectorMatch[1].matchAll(/data-i18n[a-z-]*/g)].map((mm) => mm[0])
  : ["data-i18n"];
const attrPattern = new RegExp(`(?:${attrNames.join("|")})="([^"]+)"`, "g");
const htmlKeys = new Set();
let m;
while ((m = attrPattern.exec(html))) htmlKeys.add(m[1]);
const missingFromTranslations = [...htmlKeys].filter((k) => !(k in baseLocale));
if (missingFromTranslations.length) {
  failed = true;
  console.error(`index.html references key(s) not in translations: ${missingFromTranslations.join(", ")}`);
}

// --- 3. static no-JS <option> fallback matches translations' languages + labels ---
const selectMatch = html.match(/<select[^>]*\bid="langSelect"[^>]*>([\s\S]*?)<\/select>/);
if (selectMatch) {
  const options = [...selectMatch[1].matchAll(/<option value="([^"]+)">([^<]*)<\/option>/g)];
  const optionLangs = options.map((mm) => mm[1]);
  const optionSet = new Set(optionLangs);
  const localeSet = new Set(locales);
  const missingFromOptions = locales.filter((l) => !optionSet.has(l));
  const extraInOptions = optionLangs.filter((l) => !localeSet.has(l));
  if (missingFromOptions.length) {
    failed = true;
    console.error(`#langSelect's static <option> fallback is missing: ${missingFromOptions.join(", ")}`);
  }
  if (extraInOptions.length) {
    failed = true;
    console.error(`#langSelect's static <option> fallback has language(s) not in translations: ${extraInOptions.join(", ")}`);
  }
  options.forEach(([, lang, text]) => {
    if (langLabels[lang] !== undefined && langLabels[lang] !== text) {
      failed = true;
      console.error(`#langSelect's static <option> text for "${lang}" is "${text}" but LANG_LABELS["${lang}"] is "${langLabels[lang]}"`);
    }
  });
} else {
  failed = true;
  console.error("Could not find <select id=\"langSelect\"> in index.html");
}

// --- 4. LANG_LABELS keys match translations' locales ---
const labelSet = new Set(Object.keys(langLabels));
const localeSet4 = new Set(locales);
const missingFromLabels = locales.filter((l) => !labelSet.has(l));
const extraInLabels = Object.keys(langLabels).filter((l) => !localeSet4.has(l));
if (missingFromLabels.length || extraInLabels.length) {
  failed = true;
  if (missingFromLabels.length) {
    console.error(`LANG_LABELS is missing: ${missingFromLabels.join(", ")}`);
  }
  if (extraInLabels.length) {
    console.error(`LANG_LABELS has language(s) not in translations: ${extraInLabels.join(", ")}`);
  }
}

// --- 5. runtime smoke test: actually run setLanguage() for every locale ---
// Fake elements carrying each data-i18n* attribute, wired to real keys, so
// setLanguage()'s per-element branches (textContent/array-<br>-join/
// placeholder/alt/aria-label/unknown-key-warn) all actually execute.
const stringKey = Object.keys(baseLocale).find((k) => typeof baseLocale[k] === "string");
const arrayKey = Object.keys(baseLocale).find((k) => Array.isArray(baseLocale[k]));
function makeEl(attrs) {
  const attrMap = attrs;
  return {
    style: {},
    firstChild: null,
    getAttribute: (name) => (name in attrMap ? attrMap[name] : null),
    setAttribute: () => {},
    appendChild: () => {},
    removeChild: () => {},
  };
}
const fakeElements = [
  makeEl({ "data-i18n": stringKey }),
  makeEl({ "data-i18n": arrayKey }),
  makeEl({ "data-i18n-placeholder": stringKey }),
  makeEl({ "data-i18n-alt": stringKey }),
  makeEl({ "data-i18n-aria-label": stringKey }),
];
let capturedListener = null;
const fakeSelect = { value: "", innerHTML: "", appendChild: () => {}, addEventListener: () => {} };
const runtimeSandbox = {
  console,
  document: {
    addEventListener: (evt, cb) => { if (evt === "DOMContentLoaded") capturedListener = cb; },
    getElementById: (id) => (id === "langSelect" ? fakeSelect : null),
    querySelectorAll: () => fakeElements,
    createElement: () => ({ setAttribute: () => {}, appendChild: () => {} }),
    createTextNode: () => ({}),
    documentElement: {},
  },
  localStorage: (() => {
    const store = {};
    return { getItem: (k) => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = v; } };
  })(),
  navigator: { language: "en-US" },
};
vm.createContext(runtimeSandbox);
try {
  vm.runInContext(code + "\n;globalThis.setLanguage = setLanguage;", runtimeSandbox, { filename: i18nPath });
  if (typeof capturedListener !== "function") throw new Error("DOMContentLoaded listener was never registered");
  capturedListener();
  locales.forEach((locale) => runtimeSandbox.setLanguage(locale));
} catch (e) {
  failed = true;
  console.error(`Runtime smoke test threw: ${e.stack || e}`);
}

if (failed) {
  console.error("\ni18n check FAILED — see errors above.");
  process.exit(1);
}

console.log(`i18n check OK — ${locales.length} locales, ${allKeys.size} keys each, index.html and #langSelect in sync.`);
