/**
 * ISBN
 *
 * @version 1.0.2
 */
export default class {
    #private;
    /**
     * @param {string} isbn - チェックする ISBN の値
     * @param {boolean} strict - 厳格モード（true ならハイフンなしの構文はエラーとする）
     */
    constructor(isbn: string, strict?: boolean);
    /**
     * verifyCheckDigit() のエイリアス
     *
     * @returns {boolean} フォーマット、チェックデジットともに正しい場合は true
     */
    isValid(): boolean;
    /**
     * 13桁の ISBN か
     *
     * @returns {boolean} 現行規格（13桁）の ISBN なら true
     */
    isIsbn13(): boolean;
    /**
     * 10桁の ISBN か
     *
     * @returns {boolean} 旧規格（10桁）の ISBN なら true
     */
    isIsbn10(): boolean;
    /**
     * フォーマットを検証（チェックデジットの検証はしない）
     *
     * @returns {boolean} フォーマットが正しい場合は true
     */
    verifyFormat(): boolean;
    /**
     * チェックデジットも含めてフォーマットを検証（該当する出版物が存在するとは限らない）
     *
     * @returns {boolean} フォーマット、チェックデジットともに正しい場合は true
     */
    verifyCheckDigit(): boolean;
    /**
     * ハイフンなしの ISBN を取得する
     *
     * @returns {string} ハイフンなしの ISBN
     */
    private _getNoHyphens;
    /**
     * ISBN-13 のチェックデジットを取得する
     *
     * @param {string} isbnNoHyphens - ハイフンなしの ISBN
     *
     * @returns {string} チェックデジット
     */
    private _getCheckDigit13;
    /**
     * ISBN-10 のチェックデジットを取得する
     *
     * @param {string} isbnNoHyphens - ハイフンなしの ISBN
     *
     * @returns {string} チェックデジット
     */
    private _getCheckDigit10;
}
//# sourceMappingURL=ISBN.mjs.d.ts.map