# toBeString
Utility for building class-like strings with conditional chaining.

# 📦 Class Builder Utility

A tiny utility for building class-like strings with conditional chaining, duplicate handling, and formatting.

## 🚀 Usage

```js
function createClass(base) {
  return new ToBeString(base);
}
const cls = createClass("ui").add(true, "big").add(true, "red").end("header");

console.log(cls);
// "ui big red header"
```

---

# 🔧 API

`createClass(base?: string)`

Initialize a new builder with an optional base string.

`.config(options)`

Update settings:

- `ignoreDuplicate`: boolean → if `true`, repeated classes are skipped.
- `separator`: string → character(s) used between parts (default `" "`).
- `prefix`: string → string to prepend.
- `suffix`: string → string to append.

Example:

```js
  createClass("btn")
    .config({ ignoreDuplicate: true, separator: "-", prefix: "[", suffix: "]" })
    .add(true, "primary")
    .end("large");
    // "[btn-primary-large]"
```

---

`.add(condition, value)`

Conditionally adds values:

- `add(true, "big")` → "big" is added.
- `add(false, "red")` → ignored.
- `add(true, ["one", "two"])` → adds both.
- `add({ className: condition })` → object mapping (adds only where `condition` is truthy).

---

`.merge(...strings)`
Merge in entire class strings:

```js
createClass("ui").merge("big red").end("header");
// "ui big red header"
```

---

`.end(value?)`
Finalize and return the string.

```js
createClass("ui").add(true, "big").end("header");
// "ui big header"
```

---

## Formatters (string-returning methods)

- `.toLowerCase()` → `"ui big red"`
- `.toUpperCase()` → `"UI BIG RED"`
- `.toCamelCase()` → `"uiBigRed"`
- `.toSentenceCase()` → `"Ui big red"`

### These terminate the chain (return string, not builder).

```js
createClass("btn").add(true, "primary").toCamelCase();
// "btnPrimary"
```

---

# ⚡Examples

```js
// Conditional
console.log(createClass("ui").add(false, "hidden").add(true, "visible").end("content"));
// "ui visible content"

// Merge strings
console.log(createClass("box").merge("shadow-lg p-4").end("rounded"));
// "box shadow-lg p-4 rounded"

// Deduplicate
console.log(createClass("card").config({ ignoreDuplicate: true }).add(true, "active").add(true, "active").end("border"));
// "card active border"
```

---

✅ Summary

- Chain `.add`, `.merge`, `.config` to build dynamically.
- Use `.end(...)` or formatters (`toUpperCase`, `toCamelCase`, `toSentenceCase`) to output a string.
- Auto trims and handles duplicates if configured.
