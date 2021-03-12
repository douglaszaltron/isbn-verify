/**
 * ISBN
 */
export default class {
	#isbnNoHyphens: string; // ハイフンなしの ISBN
	#isbn13 = false; // 現行規格（13桁）の ISBN か
	#isbn10 = false; // 旧規格（10桁）の ISBN か

	/**
	 * @param {string} isbn - ISBN value to check
	 * @param {boolean} strict - Strict mode. If `true`, syntax without hyphens is an error. If not specified, it defaults to `false`
	 */
	constructor(isbn: string, strict = false) {
		const isbnNoHyphens = isbn.replace(/-/g, '');
		this.#isbnNoHyphens = isbnNoHyphens;

		if (strict) {
			const length = isbn.length;

			if (length === 17 && /^(978|979)-\d{1,5}-\d{1,7}-\d{1,7}-\d$/.test(isbn)) {
				this.#isbn13 = true;
			} else if (length === 13 && /^\d{1,5}-\d{1,7}-\d{1,7}-[\dX]$/.test(isbn)) {
				this.#isbn10 = true;
			}
		} else {
			if (!isbn.includes('--')) {
				if (/^(978|979)\d{10}$/.test(isbnNoHyphens)) {
					if (/^\d[\d-]{11,15}\d$/.test(isbn)) {
						this.#isbn13 = true;
					}
				} else if (/^\d{9}[\dX]$/.test(isbnNoHyphens)) {
					if (/^\d[\d-]{8,11}[\dX]$/.test(isbn)) {
						this.#isbn10 = true;
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
	isValid(): boolean {
		return this.verifyCheckDigit();
	}

	/**
	 * Whether it is a 13-digit ISBN
	 *
	 * @returns {boolean} `true` for current standard (13 digit) ISBN
	 */
	isIsbn13(): boolean {
		return this.#isbn13;
	}

	/**
	 * Whether it is a 10-digit ISBN
	 *
	 * @returns {boolean} `true` for old standard (10 digit) ISBN
	 */
	isIsbn10(): boolean {
		return this.#isbn10;
	}

	/**
	 * Verify format (do not verify check digit)
	 *
	 * @returns {boolean} `true` if the format is correct
	 */
	verifyFormat(): boolean {
		return this.#isbn13 || this.#isbn10;
	}

	/**
	 * Verify format including check digit (not necessarily applicable publication)
	 *
	 * @returns {boolean} `true` if both format and check digit are correct
	 */
	verifyCheckDigit(): boolean {
		if (this.#isbn13) {
			const isbnNoHyphens = this.#isbnNoHyphens;
			return isbnNoHyphens.substring(12) === this._getCheckDigit13(isbnNoHyphens);
		} else if (this.#isbn10) {
			const isbnNoHyphens = this.#isbnNoHyphens;
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
	private _getCheckDigit13(isbnNoHyphens: string): string {
		const checkDigit = String(
			10 -
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
					10)
		);

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
	private _getCheckDigit10(isbnNoHyphens: string): string {
		const checkDigit = String(
			11 -
				((Number(isbnNoHyphens.substring(0, 1)) * 10 +
					Number(isbnNoHyphens.substring(1, 2)) * 9 +
					Number(isbnNoHyphens.substring(2, 3)) * 8 +
					Number(isbnNoHyphens.substring(3, 4)) * 7 +
					Number(isbnNoHyphens.substring(4, 5)) * 6 +
					Number(isbnNoHyphens.substring(5, 6)) * 5 +
					Number(isbnNoHyphens.substring(6, 7)) * 4 +
					Number(isbnNoHyphens.substring(7, 8)) * 3 +
					Number(isbnNoHyphens.substring(8, 9)) * 2) %
					11)
		);

		switch (checkDigit) {
			case '10':
				return 'X';
			case '11':
				return '0';
		}

		return checkDigit;
	}
}
