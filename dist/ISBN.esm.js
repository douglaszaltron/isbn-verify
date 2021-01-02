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
 *
 * @version 1.0.2
 */
export default class {
    /**
     * @param {string} isbn - チェックする ISBN の値
     * @param {boolean} strict - 厳格モード（true ならハイフンなしの構文はエラーとする）
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
     * verifyCheckDigit() のエイリアス
     *
     * @returns {boolean} フォーマット、チェックデジットともに正しい場合は true
     */
    isValid() {
        return this.verifyCheckDigit();
    }
    /**
     * 13桁の ISBN か
     *
     * @returns {boolean} 現行規格（13桁）の ISBN なら true
     */
    isIsbn13() {
        return __classPrivateFieldGet(this, _isbn13);
    }
    /**
     * 10桁の ISBN か
     *
     * @returns {boolean} 旧規格（10桁）の ISBN なら true
     */
    isIsbn10() {
        return __classPrivateFieldGet(this, _isbn10);
    }
    /**
     * フォーマットを検証（チェックデジットの検証はしない）
     *
     * @returns {boolean} フォーマットが正しい場合は true
     */
    verifyFormat() {
        return __classPrivateFieldGet(this, _isbn13) || __classPrivateFieldGet(this, _isbn10);
    }
    /**
     * チェックデジットも含めてフォーマットを検証（該当する出版物が存在するとは限らない）
     *
     * @returns {boolean} フォーマット、チェックデジットともに正しい場合は true
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
