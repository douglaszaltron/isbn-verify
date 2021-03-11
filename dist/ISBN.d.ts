/**
 * ISBN
 */
export default class {
    #private;
    /**
     * @param {string} isbn - ISBN value to check
     * @param {boolean} strict - Strict mode. If `true`, syntax without hyphens is an error. If not specified, it defaults to `false`
     */
    constructor(isbn: string, strict?: boolean);
    /**
     * Alias of `verifyCheckDigit()`
     *
     * @returns {boolean} `true` if both format and check digit are correct
     */
    isValid(): boolean;
    /**
     * Whether it is a 13-digit ISBN
     *
     * @returns {boolean} `true` for current standard (13 digit) ISBN
     */
    isIsbn13(): boolean;
    /**
     * Whether it is a 10-digit ISBN
     *
     * @returns {boolean} `true` for old standard (10 digit) ISBN
     */
    isIsbn10(): boolean;
    /**
     * Verify format (do not verify check digit)
     *
     * @returns {boolean} `true` if the format is correct
     */
    verifyFormat(): boolean;
    /**
     * Verify format including check digit (not necessarily applicable publication)
     *
     * @returns {boolean} `true` if both format and check digit are correct
     */
    verifyCheckDigit(): boolean;
    /**
     * ISBN-13 のチェックデジットを取得する
     *
     * @returns {string} チェックデジット
     */
    private _getCheckDigit13;
    /**
     * ISBN-10 のチェックデジットを取得する
     *
     * @returns {string} チェックデジット
     */
    private _getCheckDigit10;
}
//# sourceMappingURL=ISBN.d.ts.map