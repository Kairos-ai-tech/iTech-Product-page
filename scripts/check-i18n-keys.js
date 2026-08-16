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
//    and call setLanguage() for every locale against a minimal fake DOM
//    carrying every attribute from the same selector part 2 derived, so
//    a throwing bug in populateLangSelect()/initLanguage()/setLanguage()
//    itself is caught too — parts 1-4 only validate the static data.
// 6. i18n.js's DEFAULT_LANG must itself be a real key in translations —
//    initLanguage()'s final fallback is setLanguage(DEFAULT_LANG); if that
//    constant and the translations key ever drift apart, every visitor
//    who falls through to the fallback hits a throw.
// 7. Every data-i18n* attribute actually used in index.html must be one
//    setLanguage() knows about (the reverse of part 2) — catches a typo'd
//    attribute name (e.g. data-i18n-arialabel) that matches neither side
//    and so silently does nothing at runtime.
// 8. Every var(--foo) referenced in index.html or styles.css must be
//    defined in styles.css's :root block — catches a typo'd/renamed CSS
//    custom property, including the inline-SVG color tokens that have no
//    other runtime signal when broken (they just silently fall back to
//    the CSS-wide initial value).

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const repoRoot = path.join(__dirname, "..");
const i18nPath = path.join(repoRoot, "i18n.js");
const htmlPath = path.join(repoRoot, "index.html");
const cssPath = path.join(repoRoot, "styles.css");
const code = fs.readFileSync(i18nPath, "utf8");
const html = fs.readFileSync(htmlPath, "utf8");
const css = fs.readFileSync(cssPath, "utf8");

let failed = false;

// One sandbox, one execution: a fake DOM rich enough to both read back the
// static translations/LANG_LABELS objects AND, later, actually drive
// setLanguage() end to end (part 5). Previously this ran two separate
// vm.runInContext passes with two independently-stubbed sandboxes, which
// was redundant work and its own source of drift.
let fakeElements = [];
let capturedListener = null;
const fakeSelect = { value: "", innerHTML: "", appendChild: () => {}, addEventListener: () => {} };
const sandbox = {
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
vm.createContext(sandbox);
vm.runInContext(
  code + "\n;globalThis.translations = translations; globalThis.LANG_LABELS = LANG_LABELS; globalThis.setLanguage = setLanguage; globalThis.DEFAULT_LANG = DEFAULT_LANG;",
  sandbox,
  { filename: i18nPath }
);

const translations = sandbox.translations;
const langLabels = sandbox.LANG_LABELS;
const locales = Object.keys(translations);

// --- 6. DEFAULT_LANG is a real translations key ---
if (!(sandbox.DEFAULT_LANG in translations)) {
  failed = true;
  console.error(`i18n.js's DEFAULT_LANG ("${sandbox.DEFAULT_LANG}") is not a key in translations — initLanguage()'s fallback would throw.`);
}
const keysets = {};
locales.forEach((locale) => {
  keysets[locale] = new Set(Object.keys(translations[locale]));
});

const allKeys = new Set();
locales.forEach((locale) => keysets[locale].forEach((k) => allKeys.add(k)));

// --- 1. cross-locale key parity ---
locales.forEach((locale) => {
  const missing = [...allKeys].filter((k) => !keysets[locale].has(k));
  if (missing.length) {
    failed = true;
    console.error(`[${locale}] missing ${missing.length} key(s): ${missing.join(", ")}`);
  }
});

// --- 2. index.html data-i18n* keys exist in translations ---
// Pull the attribute suffix list out of i18n.js's setLanguage() selector
// instead of hand-duplicating it, so a new attribute type added there is
// automatically covered here (and in part 5's smoke test, see below).
const baseLocale = translations[sandbox.DEFAULT_LANG] || translations[locales[0]];
const setLanguageBody = code.slice(code.indexOf("function setLanguage"));
const selectorMatch = setLanguageBody.match(/\.querySelectorAll\(\s*"([^"]+)"\s*\)/);
const attrNames = selectorMatch ? [...selectorMatch[1].matchAll(/data-i18n[a-z-]*/g)].map((mm) => mm[0]) : [];
if (attrNames.length === 0) {
  failed = true;
  console.error("Could not find setLanguage()'s querySelectorAll selector (or it had no data-i18n* attributes) in i18n.js — refusing to run a degenerate check.");
}
const attrPattern = attrNames.length ? new RegExp(`(?:${attrNames.join("|")})="([^"]+)"`, "g") : null;
const htmlKeys = new Set();
if (attrPattern) {
  let m;
  while ((m = attrPattern.exec(html))) htmlKeys.add(m[1]);
  const missingFromTranslations = [...htmlKeys].filter((k) => !(k in baseLocale));
  if (missingFromTranslations.length) {
    failed = true;
    console.error(`index.html references key(s) not in translations: ${missingFromTranslations.join(", ")}`);
  }
}

// --- 7. every data-i18n* attribute actually used in index.html is known ---
// Reverse of part 2: catches a typo'd attribute name (e.g. data-i18n-arialabel)
// that would match neither setLanguage()'s selector nor part 2's attrPattern,
// so it silently does nothing at runtime with no signal from either check.
const usedAttrs = new Set([...html.matchAll(/\sdata-i18n[a-z-]*(?==")/g)].map((mm) => mm[0].trim()));
const unknownAttrs = [...usedAttrs].filter((a) => !attrNames.includes(a));
if (unknownAttrs.length) {
  failed = true;
  console.error(`index.html uses data-i18n* attribute(s) setLanguage() doesn't select for (typo?): ${unknownAttrs.join(", ")}`);
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
// Fake elements carrying each data-i18n* attribute (same list part 2 derived,
// so a new attribute type is covered here too), wired to real keys, so
// setLanguage()'s per-element branches (textContent/array-<br>-join/
// placeholder/alt/aria-label/unknown-key-warn) all actually execute.
const stringKey = Object.keys(baseLocale).find((k) => typeof baseLocale[k] === "string");
const arrayKey = Object.keys(baseLocale).find((k) => Array.isArray(baseLocale[k]));
function makeEl(attrs) {
  return {
    style: {},
    firstChild: null,
    getAttribute: (name) => (name in attrs ? attrs[name] : null),
    setAttribute: () => {},
    appendChild: () => {},
    removeChild: () => {},
  };
}
if (attrNames.length) {
  fakeElements = attrNames.flatMap((attr) =>
    attr === "data-i18n" ? [makeEl({ [attr]: stringKey }), makeEl({ [attr]: arrayKey })] : [makeEl({ [attr]: stringKey })]
  );
}
try {
  if (typeof capturedListener !== "function") throw new Error("DOMContentLoaded listener was never registered");
  capturedListener();
  locales.forEach((locale) => sandbox.setLanguage(locale));
} catch (e) {
  failed = true;
  console.error(`Runtime smoke test threw: ${e.stack || e}`);
}

// --- 8. every var(--foo) reference resolves to a defined custom property ---
// Scans the whole stylesheet, not just :root, since some custom properties
// (e.g. --mask-pos) are intentionally scoped to a single selector rather
// than declared globally.
const definedProps = new Set([...css.matchAll(/--[\w-]+(?=\s*:)/g)].map((mm) => mm[0]));
const usedProps = new Set(
  [...html.matchAll(/var\((--[\w-]+)/g), ...css.matchAll(/var\((--[\w-]+)/g)].map((mm) => mm[1])
);
const undefinedProps = [...usedProps].filter((p) => !definedProps.has(p));
if (undefinedProps.length) {
  failed = true;
  console.error(`var() reference(s) to custom propert(y/ies) not defined in styles.css's :root: ${undefinedProps.join(", ")}`);
}

if (failed) {
  console.error("\ni18n check FAILED — see errors above.");
  process.exit(1);
}

console.log(`i18n check OK — ${locales.length} locales, ${allKeys.size} keys each, index.html and #langSelect in sync.`);
