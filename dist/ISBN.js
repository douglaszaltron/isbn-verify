var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _isbn, _isbn13, _isbn10;
/**
 * ISBN
 */
export default class {
    /**
     * @param {string} isbn - ISBN value to check
     * @param {boolean} strict - Strict mode. If `true`, syntax without hyphens is an error. If not specified, it defaults to `false`
     */
    constructor(isbn, strict = false) {
        _isbn.set(this, void 0);
        _isbn13.set(this, false); // 現行規格（13桁）の ISBN か
        _isbn10.set(this, false); // 旧規格（10桁）の ISBN か
        __classPrivateFieldSet(this, _isbn, isbn);
        const length = isbn.length;
        if (length === 17 && /^(978|979)-\d{1,5}-\d{1,7}-\d{1,7}-\d$/.test(isbn)) {
            __classPrivateFieldSet(this, _isbn13, true);
        }
        else if (/^\d{13}$/.test(isbn)) {
            __classPrivateFieldSet(this, _isbn13, !strict);
        }
        else if (length === 13 && /^\d{1,5}-\d{1,7}-\d{1,7}-[\dX]$/.test(isbn)) {
            __classPrivateFieldSet(this, _isbn10, true);
        }
        else if (/^\d{9}[\dX]$/.test(isbn)) {
            __classPrivateFieldSet(this, _isbn10, !strict);
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
     * @returns {boolean} `true` for current standard (13 digit) ISBN
     */
    isIsbn13() {
        return __classPrivateFieldGet(this, _isbn13);
    }
    /**
     * Whether it is a 10-digit ISBN
     *
     * @returns {boolean} `true` for old standard (10 digit) ISBN
     */
    isIsbn10() {
        return __classPrivateFieldGet(this, _isbn10);
    }
    /**
     * Verify format (do not verify check digit)
     *
     * @returns {boolean} `true` if the format is correct
     */
    verifyFormat() {
        return __classPrivateFieldGet(this, _isbn13) || __classPrivateFieldGet(this, _isbn10);
    }
    /**
     * Verify format including check digit (not necessarily applicable publication)
     *
     * @returns {boolean} `true` if both format and check digit are correct
     */
    verifyCheckDigit() {
        if (__classPrivateFieldGet(this, _isbn13)) {
            /* ISBN-13 */
            const isbnNoHyphens = this._getNoHyphens();
            return isbnNoHyphens.substring(12) === this._getCheckDigit13(isbnNoHyphens);
        }
        else if (__classPrivateFieldGet(this, _isbn10)) {
            /* ISBN-10 */
            const isbnNoHyphens = this._getNoHyphens();
            return isbnNoHyphens.substring(9) === this._getCheckDigit10(isbnNoHyphens);
        }
        return false;
    }
    /**
     * ハイフンなしの ISBN を取得する
     *
     * @returns {string} ハイフンなしの ISBN
     */
    _getNoHyphens() {
        return __classPrivateFieldGet(this, _isbn).replace(/-/g, '');
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
_isbn = new WeakMap(), _isbn13 = new WeakMap(), _isbn10 = new WeakMap();
//# sourceMappingURL=ISBN.js.map