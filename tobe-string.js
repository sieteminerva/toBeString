/**
 * Utility for building class-like strings with conditional chaining.
 */
export class ToBeString {
  /**
   * @param {string} [base=""] - Initial base value.
   */
  constructor(base = "") {
    /** @private @type {string[]} */
    this.parts = [];
    /** @private @type {ToBeStringOptions} */
    this.settings = {
      ignoreDuplicate: false,
      separator: " ",
      prefix: "",
      suffix: "",
    };

    if (base) this.parts.push(base);
  }

  /**
   * Update configuration.
   * @param {ToBeStringOptions} options
   * @returns {this}
   */
  config(options = {}) {
    Object.assign(this.settings, options);
    return this;
  }

  /**
   * Conditionally add class(es).
   * @param {boolean|Object<string, boolean>} condition - If boolean, decides whether to add. If object, adds keys with truthy values.
   * @param {string|string[]} [value] - String or array of strings to add.
   * @returns {this}
   */
  add(condition, value) {
    if (typeof condition === "boolean" && condition && value) {
      if (Array.isArray(value)) {
        value.forEach((v) => this._push(v));
      } else {
        this._push(value);
      }
    } else if (typeof condition === "object" && condition !== null) {
      for (const [k, v] of Object.entries(condition)) {
        if (v) this._push(k);
      }
    }
    return this;
  }

  /**
   * Merge in entire class strings.
   * @param {...string} strings - One or more strings containing classes.
   * @returns {this}
   */
  merge(...strings) {
    strings.forEach((str) =>
      str
        .split(/\s+/)
        .filter(Boolean)
        .forEach((v) => this._push(v))
    );
    return this;
  }

  /**
   * Finalize the builder and return string.
   * @param {string} [value] - Extra value to append before finalizing.
   * @returns {string}
   */
  end(value) {
    if (value) this._push(value);
    return this._build();
  }

  /**
   * Convert to lowercase string.
   * @returns {string}
   */
  toLowerCase() {
    return this._build().toLowerCase();
  }

  /**
   * Convert to uppercase string.
   * @returns {string}
   */
  toUpperCase() {
    return this._build().toUpperCase();
  }

  /**
   * Convert to camelCase string.
   * @returns {string}
   */
  toCamelCase() {
    const arr = this._build().split(this.settings.separator);
    return arr.map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())).join("");
  }

  /**
   * Convert to Sentence case string.
   * @returns {string}
   */
  toSentenceCase() {
    const str = this._build().toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /** @private */
  _push(val) {
    if (!val) return;
    if (this.settings.ignoreDuplicate && this.parts.includes(val)) return;
    this.parts.push(val);
  }

  /** @private */
  _build() {
    return this.settings.prefix + this.parts.join(this.settings.separator).replace(/\s+/g, " ").trim() + this.settings.suffix;
  }
}

/**
 * Factory helper for convenience.
 * @param {string} [base=""]
 * @returns {ToBeString}
 */
export function toBeString(base = "") {
  return new ToBeString(base);
}
