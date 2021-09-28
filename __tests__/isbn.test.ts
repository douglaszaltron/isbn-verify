import ISBN from '../src';

describe('ISBN-13（ハイフンあり）', () => {
	const isbn = new ISBN('978-4-06-519981-7');

	test('正当', () => {
		expect(isbn.isValid()).toBeTruthy();
	});
	test('13桁', () => {
		expect(isbn.isIsbn13()).toBeTruthy();
	});
	test('13桁・チェックデジット', () => {
		expect(isbn.isIsbn13({ check_digit: true })).toBeTruthy();
	});
	test('10桁', () => {
		expect(isbn.isIsbn10()).toBeFalsy();
	});
	test('フォーマット', () => {
		expect(isbn.verifyFormat()).toBeTruthy();
	});
	test('チェックデジット', () => {
		expect(isbn.verifyCheckDigit()).toBeTruthy();
	});
});

describe('ISBN-13（ハイフンあり・Strictモード）', () => {
	const isbn = new ISBN('978-4-06-519981-7', true);

	test('正当', () => {
		expect(isbn.isValid()).toBeTruthy();
	});
	test('13桁', () => {
		expect(isbn.isIsbn13()).toBeTruthy();
	});
	test('13桁・チェックデジット', () => {
		expect(isbn.isIsbn13({ check_digit: true })).toBeTruthy();
	});
	test('10桁', () => {
		expect(isbn.isIsbn10()).toBeFalsy();
	});
	test('フォーマット', () => {
		expect(isbn.verifyFormat()).toBeTruthy();
	});
	test('チェックデジット', () => {
		expect(isbn.verifyCheckDigit()).toBeTruthy();
	});
});

describe('ISBN-13（ハイフンなし）', () => {
	const isbn = new ISBN('9784065199817');

	test('正当', () => {
		expect(isbn.isValid()).toBeTruthy();
	});
	test('13桁', () => {
		expect(isbn.isIsbn13()).toBeTruthy();
	});
	test('13桁・チェックデジット', () => {
		expect(isbn.isIsbn13({ check_digit: true })).toBeTruthy();
	});
	test('10桁', () => {
		expect(isbn.isIsbn10()).toBeFalsy();
	});
	test('フォーマット', () => {
		expect(isbn.verifyFormat()).toBeTruthy();
	});
	test('チェックデジット', () => {
		expect(isbn.verifyCheckDigit()).toBeTruthy();
	});
});

describe('ISBN-13（ハイフンなし・Strictモード）', () => {
	const isbn = new ISBN('9784065199817', true);

	test('正当', () => {
		expect(isbn.isValid()).toBeFalsy();
	});
	test('13桁', () => {
		expect(isbn.isIsbn13()).toBeFalsy();
	});
	test('13桁・チェックデジット', () => {
		expect(isbn.isIsbn13({ check_digit: true })).toBeFalsy();
	});
	test('10桁', () => {
		expect(isbn.isIsbn10()).toBeFalsy();
	});
	test('フォーマット', () => {
		expect(isbn.verifyFormat()).toBeFalsy();
	});
	test('チェックデジット', () => {
		expect(isbn.verifyCheckDigit()).toBeFalsy();
	});
});

describe('ISBN-10（ハイフンあり）', () => {
	const isbn = new ISBN('4-06-519981-6');

	test('正当', () => {
		expect(isbn.isValid()).toBeTruthy();
	});
	test('13桁', () => {
		expect(isbn.isIsbn13()).toBeFalsy();
	});
	test('10桁', () => {
		expect(isbn.isIsbn10()).toBeTruthy();
	});
	test('10桁・チェックデジット', () => {
		expect(isbn.isIsbn10({ check_digit: true })).toBeTruthy();
	});
	test('フォーマット', () => {
		expect(isbn.verifyFormat()).toBeTruthy();
	});
	test('チェックデジット', () => {
		expect(isbn.verifyCheckDigit()).toBeTruthy();
	});
});

describe('ISBN-10（ハイフンあり・Strictモード）', () => {
	const isbn = new ISBN('4-06-519981-6', true);

	test('正当', () => {
		expect(isbn.isValid()).toBeTruthy();
	});
	test('13桁', () => {
		expect(isbn.isIsbn13()).toBeFalsy();
	});
	test('10桁', () => {
		expect(isbn.isIsbn10()).toBeTruthy();
	});
	test('10桁・チェックデジット', () => {
		expect(isbn.isIsbn10({ check_digit: true })).toBeTruthy();
	});
	test('フォーマット', () => {
		expect(isbn.verifyFormat()).toBeTruthy();
	});
	test('チェックデジット', () => {
		expect(isbn.verifyCheckDigit()).toBeTruthy();
	});
});

describe('ISBN-10（ハイフンなし）', () => {
	const isbn = new ISBN('4065199816');

	test('正当', () => {
		expect(isbn.isValid()).toBeTruthy();
	});
	test('13桁', () => {
		expect(isbn.isIsbn13()).toBeFalsy();
	});
	test('10桁', () => {
		expect(isbn.isIsbn10()).toBeTruthy();
	});
	test('10桁・チェックデジット', () => {
		expect(isbn.isIsbn10({ check_digit: true })).toBeTruthy();
	});
	test('フォーマット', () => {
		expect(isbn.verifyFormat()).toBeTruthy();
	});
	test('チェックデジット', () => {
		expect(isbn.verifyCheckDigit()).toBeTruthy();
	});
});

describe('ISBN-10（ハイフンなし・Strictモード）', () => {
	const isbn = new ISBN('4065199816', true);

	test('正当', () => {
		expect(isbn.isValid()).toBeFalsy();
	});
	test('13桁', () => {
		expect(isbn.isIsbn13()).toBeFalsy();
	});
	test('10桁', () => {
		expect(isbn.isIsbn10()).toBeFalsy();
	});
	test('10桁・チェックデジット', () => {
		expect(isbn.isIsbn10({ check_digit: true })).toBeFalsy();
	});
	test('フォーマット', () => {
		expect(isbn.verifyFormat()).toBeFalsy();
	});
	test('チェックデジット', () => {
		expect(isbn.verifyCheckDigit()).toBeFalsy();
	});
});

describe('ISBN-13（ハイフンあり）、チェックデジットが違う', () => {
	const isbn = new ISBN('978-4-06-519981-0');

	test('正当', () => {
		expect(isbn.isValid()).toBeFalsy();
	});
	test('13桁', () => {
		expect(isbn.isIsbn13()).toBeTruthy();
	});
	test('13桁・チェックデジット', () => {
		expect(isbn.isIsbn13({ check_digit: true })).toBeFalsy();
	});
	test('10桁', () => {
		expect(isbn.isIsbn10()).toBeFalsy();
	});
	test('フォーマット', () => {
		expect(isbn.verifyFormat()).toBeTruthy();
	});
	test('チェックデジット', () => {
		expect(isbn.verifyCheckDigit()).toBeFalsy();
	});
});

describe('ISBN-13（ハイフンなし）、チェックデジットが違う', () => {
	const isbn = new ISBN('9784065199810');

	test('正当', () => {
		expect(isbn.isValid()).toBeFalsy();
	});
	test('13桁', () => {
		expect(isbn.isIsbn13()).toBeTruthy();
	});
	test('13桁・チェックデジット', () => {
		expect(isbn.isIsbn13({ check_digit: true })).toBeFalsy();
	});
	test('10桁', () => {
		expect(isbn.isIsbn10()).toBeFalsy();
	});
	test('フォーマット', () => {
		expect(isbn.verifyFormat()).toBeTruthy();
	});
	test('チェックデジット', () => {
		expect(isbn.verifyCheckDigit()).toBeFalsy();
	});
});

describe('ISBN-10（ハイフンあり）、チェックデジットが違う', () => {
	const isbn = new ISBN('4-06-519981-X');

	test('正当', () => {
		expect(isbn.isValid()).toBeFalsy();
	});
	test('13桁', () => {
		expect(isbn.isIsbn13()).toBeFalsy();
	});
	test('10桁', () => {
		expect(isbn.isIsbn10()).toBeTruthy();
	});
	test('10桁・チェックデジット', () => {
		expect(isbn.isIsbn10({ check_digit: true })).toBeFalsy();
	});
	test('フォーマット', () => {
		expect(isbn.verifyFormat()).toBeTruthy();
	});
	test('チェックデジット', () => {
		expect(isbn.verifyCheckDigit()).toBeFalsy();
	});
});

describe('ISBN-10（ハイフンなし）、チェックデジットが違う', () => {
	const isbn = new ISBN('406519981X');

	test('正当', () => {
		expect(isbn.isValid()).toBeFalsy();
	});
	test('13桁', () => {
		expect(isbn.isIsbn13()).toBeFalsy();
	});
	test('10桁', () => {
		expect(isbn.isIsbn10()).toBeTruthy();
	});
	test('10桁・チェックデジット', () => {
		expect(isbn.isIsbn10({ check_digit: true })).toBeFalsy();
	});
	test('フォーマット', () => {
		expect(isbn.verifyFormat()).toBeTruthy();
	});
	test('チェックデジット', () => {
		expect(isbn.verifyCheckDigit()).toBeFalsy();
	});
});

describe('ハイフンのパターン', () => {
	test('ISBN-13（ハイフン中途半端）', () => {
		const isbn = new ISBN('978-4065199817');
		expect(isbn.isIsbn13()).toBeTruthy();
	});
	test('ISBN-13（ハイフン中途半端・Strictモード）', () => {
		const isbn = new ISBN('978-4065199817', true);
		expect(isbn.isIsbn13()).toBeFalsy();
	});
	test('ISBN-13（先頭ハイフン）', () => {
		const isbn = new ISBN('-9784065199817');
		expect(isbn.verifyFormat()).toBeFalsy();
	});
	test('ISBN-13（末尾ハイフン）', () => {
		const isbn = new ISBN('978-4065199817-');
		expect(isbn.verifyFormat()).toBeFalsy();
	});
	test('ISBN-13（連続ハイフン）', () => {
		const isbn = new ISBN('978--4065199817');
		expect(isbn.verifyFormat()).toBeFalsy();
	});
	test('ISBN-13（ハイフン多すぎ）', () => {
		const isbn = new ISBN('978-4-06-519-981-7');
		expect(isbn.verifyFormat()).toBeFalsy();
	});
	test('ISBN-10（ハイフン中途半端）', () => {
		const isbn = new ISBN('406-5199816');
		expect(isbn.isIsbn10()).toBeTruthy();
	});
	test('ISBN-10（ハイフン中途半端・Strictモード）', () => {
		const isbn = new ISBN('406-5199816', true);
		expect(isbn.isIsbn10()).toBeFalsy();
	});
	test('ISBN-10（先頭ハイフン）', () => {
		const isbn = new ISBN('-4065199816');
		expect(isbn.verifyFormat()).toBeFalsy();
	});
	test('ISBN-10（末尾ハイフン）', () => {
		const isbn = new ISBN('4065199816-');
		expect(isbn.verifyFormat()).toBeFalsy();
	});
	test('ISBN-10（連続ハイフン）', () => {
		const isbn = new ISBN('406--5199816');
		expect(isbn.verifyFormat()).toBeFalsy();
	});
	test('ISBN-10（ハイフン多すぎ）', () => {
		const isbn = new ISBN('4-06-519-981-6');
		expect(isbn.verifyFormat()).toBeFalsy();
	});
});

describe('いろいろな文字列を入れてみる', () => {
	test('13桁のチェックデジットが 0', () => {
		const isbn = new ISBN('978-4-8356-3517-0');
		expect(isbn.isValid()).toBeTruthy();
	});
	test('10桁のチェックデジットが X', () => {
		const isbn = new ISBN('409126719X');
		expect(isbn.isValid()).toBeTruthy();
	});
	test('10桁のチェックデジットが 0', () => {
		const isbn = new ISBN('4091233090');
		expect(isbn.isValid()).toBeTruthy();
	});
	test('桁数少ない', () => {
		const isbn = new ISBN('978-4-06-519981');
		expect(isbn.isValid()).toBeFalsy();
	});
	test('桁数多い', () => {
		const isbn = new ISBN('978-4-06-519981-70');
		expect(isbn.isValid()).toBeFalsy();
	});
	test('不正な文字列', () => {
		const isbn = new ISBN('hoge');
		expect(isbn.isValid()).toBeFalsy();
	});
});
