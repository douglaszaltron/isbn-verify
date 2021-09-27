var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _isbnNoHyphens, _isbn13, _isbn10;
/**
 * ISBN Verify
 */
export default class {
    /**
     * @param {string} isbn - ISBN value to check
     * @param {boolean} strict - Strict mode. If `true`, syntax without hyphens is an error. If not specified, it defaults to `false`
     */
    constructor(isbn, strict = false) {
        _isbnNoHyphens.set(this, void 0); // ハイフンなしの ISBN
        _isbn13.set(this, false); // 現行規格（13桁）の ISBN か
        _isbn10.set(this, false); // 旧規格（10桁）の ISBN か
        const isbnNoHyphens = isbn.replace(/-/g, '');
        __classPrivateFieldSet(this, _isbnNoHyphens, isbnNoHyphens, "f");
        if (strict) {
            const length = isbn.length;
            if (length === 17 && /^(978|979)-\d{1,5}-\d{1,7}-\d{1,7}-\d$/.test(isbn)) {
                __classPrivateFieldSet(this, _isbn13, true, "f");
            }
            else if (length === 13 && /^\d{1,5}-\d{1,7}-\d{1,7}-[\dX]$/.test(isbn)) {
                __classPrivateFieldSet(this, _isbn10, true, "f");
            }
        }
        else {
            if (!isbn.includes('--')) {
                if (/^(978|979)\d{10}$/.test(isbnNoHyphens)) {
                    if (/^\d[\d-]{11,15}\d$/.test(isbn)) {
                        __classPrivateFieldSet(this, _isbn13, true, "f");
                    }
                }
                else if (/^\d{9}[\dX]$/.test(isbnNoHyphens)) {
                    if (/^\d[\d-]{8,11}[\dX]$/.test(isbn)) {
                        __classPrivateFieldSet(this, _isbn10, true, "f");
                    }
                }
            }
        }
    }
    /**
     * Alias of `verifyCheckDigit()`
     *
     * @returns {boolean} `true` if both format and check digit are correct
     */
    isValid() {
        return this.verifyCheckDigit();
    }
    /**
     * Whether it is a 13-digit ISBN
     *
     * @param {isOption} options - Specifies characteristics about the check item.
     *
     * @returns {boolean} `true` for current standard (13 digit) ISBN
     */
    isIsbn13(options) {
        if (options !== undefined && options.check_digit) {
            return __classPrivateFieldGet(this, _isbn13, "f") && this.verifyCheckDigit();
        }
        return __classPrivateFieldGet(this, _isbn13, "f");
    }
    /**
     * Whether it is a 10-digit ISBN
     *
     * @param {isOption} options - Specifies characteristics about the check item.
     *
     * @returns {boolean} `true` for old standard (10 digit) ISBN
     */
    isIsbn10(options) {
        if (options !== undefined && options.check_digit) {
            return __classPrivateFieldGet(this, _isbn10, "f") && this.verifyCheckDigit();
        }
        return __classPrivateFieldGet(this, _isbn10, "f");
    }
    /**
     * Verify format (do not verify check digit)
     *
     * @returns {boolean} `true` if the format is correct
     */
    verifyFormat() {
        return __classPrivateFieldGet(this, _isbn13, "f") || __classPrivateFieldGet(this, _isbn10, "f");
    }
    /**
     * Verify format including check digit (not necessarily applicable publication)
     *
     * @returns {boolean} `true` if both format and check digit are correct
     */
    verifyCheckDigit() {
        if (__classPrivateFieldGet(this, _isbn13, "f")) {
            const isbnNoHyphens = __classPrivateFieldGet(this, _isbnNoHyphens, "f");
            return isbnNoHyphens.substring(12) === this._getCheckDigit13(isbnNoHyphens);
        }
        else if (__classPrivateFieldGet(this, _isbn10, "f")) {
            const isbnNoHyphens = __classPrivateFieldGet(this, _isbnNoHyphens, "f");
            return isbnNoHyphens.substring(9) === this._getCheckDigit10(isbnNoHyphens);
        }
        return false;
    }
    /**
     * ISBN-13 のチェックデジットを取得する
     *
     * @param {string} isbnNoHyphens - ハイフンなしの ISBN
     *
     * @returns {string} チェックデジット
     */
    _getCheckDigit13(isbnNoHyphens) {
        const checkDigit = String(10 -
            ((Number(isbnNoHyphens.substring(0, 1)) +
                Number(isbnNoHyphens.substring(1, 2)) * 3 +
                Number(isbnNoHyphens.substring(2, 3)) +
                Number(isbnNoHyphens.substring(3, 4)) * 3 +
                Number(isbnNoHyphens.substring(4, 5)) +
                Number(isbnNoHyphens.substring(5, 6)) * 3 +
                Number(isbnNoHyphens.substring(6, 7)) +
                Number(isbnNoHyphens.substring(7, 8)) * 3 +
                Number(isbnNoHyphens.substring(8, 9)) +
                Number(isbnNoHyphens.substring(9, 10)) * 3 +
                Number(isbnNoHyphens.substring(10, 11)) +
                Number(isbnNoHyphens.substring(11, 12)) * 3) %
                10));
        switch (checkDigit) {
            case '10':
                return '0';
        }
        return checkDigit;
    }
    /**
     * ISBN-10 のチェックデジットを取得する
     *
     * @param {string} isbnNoHyphens - ハイフンなしの ISBN
     *
     * @returns {string} チェックデジット
     */
    _getCheckDigit10(isbnNoHyphens) {
        const checkDigit = String(11 -
            ((Number(isbnNoHyphens.substring(0, 1)) * 10 +
                Number(isbnNoHyphens.substring(1, 2)) * 9 +
                Number(isbnNoHyphens.substring(2, 3)) * 8 +
                Number(isbnNoHyphens.substring(3, 4)) * 7 +
                Number(isbnNoHyphens.substring(4, 5)) * 6 +
                Number(isbnNoHyphens.substring(5, 6)) * 5 +
                Number(isbnNoHyphens.substring(6, 7)) * 4 +
                Number(isbnNoHyphens.substring(7, 8)) * 3 +
                Number(isbnNoHyphens.substring(8, 9)) * 2) %
                11));
        switch (checkDigit) {
            case '10':
                return 'X';
            case '11':
                return '0';
        }
        return checkDigit;
    }
}
_isbnNoHyphens = new WeakMap(), _isbn13 = new WeakMap(), _isbn10 = new WeakMap();
//# sourceMappingURL=ISBN.js.map