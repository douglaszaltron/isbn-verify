'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var id = 0;

function _classPrivateFieldLooseKey(name) {
  return "__private_" + id++ + "_" + name;
}

function _classPrivateFieldLooseBase(receiver, privateKey) {
  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
    throw new TypeError("attempted to use private field on non-instance");
  }

  return receiver;
}

var _isbnNoHyphens = /*#__PURE__*/_classPrivateFieldLooseKey("isbnNoHyphens");

var _isbn = /*#__PURE__*/_classPrivateFieldLooseKey("isbn13");

var _isbn2 = /*#__PURE__*/_classPrivateFieldLooseKey("isbn10");

/**
 * ISBN Verify
 */
var _default = /*#__PURE__*/function () {
  /**
   * @param {string} isbn - ISBN value to check
   * @param {boolean} strict - Strict mode. If `true`, syntax without hyphens is an error. If not specified, it defaults to `false`
   */
  function _default(isbn, strict) {
    if (strict === void 0) {
      strict = false;
    }

    Object.defineProperty(this, _isbnNoHyphens, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _isbn, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _isbn2, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldLooseBase(this, _isbn)[_isbn] = false; // 現行規格（13桁）の ISBN か

    _classPrivateFieldLooseBase(this, _isbn2)[_isbn2] = false; // 旧規格（10桁）の ISBN か

    var isbnNoHyphens = isbn.replace(/-/g, '');
    _classPrivateFieldLooseBase(this, _isbnNoHyphens)[_isbnNoHyphens] = isbnNoHyphens;

    if (strict) {
      var length = isbn.length;

      if (length === 17 && /^(978|979)-\d{1,5}-\d{1,7}-\d{1,7}-\d$/.test(isbn)) {
        _classPrivateFieldLooseBase(this, _isbn)[_isbn] = true;
      } else if (length === 13 && /^\d{1,5}-\d{1,7}-\d{1,7}-[\dX]$/.test(isbn)) {
        _classPrivateFieldLooseBase(this, _isbn2)[_isbn2] = true;
      }
    } else {
      if (!isbn.includes('--')) {
        if (/^(978|979)\d{10}$/.test(isbnNoHyphens)) {
          if (/^\d[\d-]{11,15}\d$/.test(isbn)) {
            _classPrivateFieldLooseBase(this, _isbn)[_isbn] = true;
          }
        } else if (/^\d{9}[\dX]$/.test(isbnNoHyphens)) {
          if (/^\d[\d-]{8,11}[\dX]$/.test(isbn)) {
            _classPrivateFieldLooseBase(this, _isbn2)[_isbn2] = true;
          }
        }
      }
    }
  }

  var _proto = _default.prototype;

  // 旧規格（10桁）の ISBN か

  /**
   * Alias of `verifyCheckDigit()`
   *
   * @returns {boolean} `true` if both format and check digit are correct
   */
  _proto.isValid = function isValid() {
    return this.verifyCheckDigit();
  }
  /**
   * Whether it is a 13-digit ISBN
   *
   * @param {isOption} options - Specifies characteristics about the check item.
   *
   * @returns {boolean} `true` for current standard (13 digit) ISBN
   */
  ;

  _proto.isIsbn13 = function isIsbn13(options) {
    if (options !== undefined && options.check_digit) {
      return _classPrivateFieldLooseBase(this, _isbn)[_isbn] && this.verifyCheckDigit();
    }

    return _classPrivateFieldLooseBase(this, _isbn)[_isbn];
  }
  /**
   * Whether it is a 10-digit ISBN
   *
   * @param {isOption} options - Specifies characteristics about the check item.
   *
   * @returns {boolean} `true` for old standard (10 digit) ISBN
   */
  ;

  _proto.isIsbn10 = function isIsbn10(options) {
    if (options !== undefined && options.check_digit) {
      return _classPrivateFieldLooseBase(this, _isbn2)[_isbn2] && this.verifyCheckDigit();
    }

    return _classPrivateFieldLooseBase(this, _isbn2)[_isbn2];
  }
  /**
   * Verify format (do not verify check digit)
   *
   * @returns {boolean} `true` if the format is correct
   */
  ;

  _proto.verifyFormat = function verifyFormat() {
    return _classPrivateFieldLooseBase(this, _isbn)[_isbn] || _classPrivateFieldLooseBase(this, _isbn2)[_isbn2];
  }
  /**
   * Verify format including check digit (not necessarily applicable publication)
   *
   * @returns {boolean} `true` if both format and check digit are correct
   */
  ;

  _proto.verifyCheckDigit = function verifyCheckDigit() {
    if (_classPrivateFieldLooseBase(this, _isbn)[_isbn]) {
      var isbnNoHyphens = _classPrivateFieldLooseBase(this, _isbnNoHyphens)[_isbnNoHyphens];

      return isbnNoHyphens.substring(12) === this._getCheckDigit13(isbnNoHyphens);
    } else if (_classPrivateFieldLooseBase(this, _isbn2)[_isbn2]) {
      var _isbnNoHyphens2 = _classPrivateFieldLooseBase(this, _isbnNoHyphens)[_isbnNoHyphens];

      return _isbnNoHyphens2.substring(9) === this._getCheckDigit10(_isbnNoHyphens2);
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
  ;

  _proto._getCheckDigit13 = function _getCheckDigit13(isbnNoHyphens) {
    var checkDigit = String(10 - (Number(isbnNoHyphens.substring(0, 1)) + Number(isbnNoHyphens.substring(1, 2)) * 3 + Number(isbnNoHyphens.substring(2, 3)) + Number(isbnNoHyphens.substring(3, 4)) * 3 + Number(isbnNoHyphens.substring(4, 5)) + Number(isbnNoHyphens.substring(5, 6)) * 3 + Number(isbnNoHyphens.substring(6, 7)) + Number(isbnNoHyphens.substring(7, 8)) * 3 + Number(isbnNoHyphens.substring(8, 9)) + Number(isbnNoHyphens.substring(9, 10)) * 3 + Number(isbnNoHyphens.substring(10, 11)) + Number(isbnNoHyphens.substring(11, 12)) * 3) % 10);

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
  ;

  _proto._getCheckDigit10 = function _getCheckDigit10(isbnNoHyphens) {
    var checkDigit = String(11 - (Number(isbnNoHyphens.substring(0, 1)) * 10 + Number(isbnNoHyphens.substring(1, 2)) * 9 + Number(isbnNoHyphens.substring(2, 3)) * 8 + Number(isbnNoHyphens.substring(3, 4)) * 7 + Number(isbnNoHyphens.substring(4, 5)) * 6 + Number(isbnNoHyphens.substring(5, 6)) * 5 + Number(isbnNoHyphens.substring(6, 7)) * 4 + Number(isbnNoHyphens.substring(7, 8)) * 3 + Number(isbnNoHyphens.substring(8, 9)) * 2) % 11);

    switch (checkDigit) {
      case '10':
        return 'X';

      case '11':
        return '0';
    }

    return checkDigit;
  };

  return _default;
}();

exports.default = _default;
//# sourceMappingURL=isbn-verify.cjs.development.js.map
