# ISBN Verify

[![npm version](https://badge.fury.io/js/%40saekitominaga%2Fisbn-verify.svg)](https://badge.fury.io/js/%40saekitominaga%2Fisbn-verify)
[![Build Status](https://www.travis-ci.com/SaekiTominaga/isbn-verify.svg)](https://www.travis-ci.com/SaekiTominaga/isbn-verify)
[![Coverage Status](https://coveralls.io/repos/github/SaekiTominaga/isbn-verify/badge.svg)](https://coveralls.io/github/SaekiTominaga/isbn-verify)

Verify ISBN string format and check digit.

## Demo

- [Demo page](https://saekitominaga.github.io/isbn-verify/demo.html)

## Examples

```JavaScript
import IsbnVerify from '@saekitominaga/isbn-verify';

const isbnVerify = new IsbnVerify('978-4-06-519981-0');
isbnVerify.isValid(); // false
isbnVerify.isIsbn10(); // false
isbnVerify.isIsbn13(); // true
isbnVerify.verifyFormat(); // true
isbnVerify.verifyCheckDigit(); // false
```

## Constructor

```TypeScript
new IsbnVerify(isbn: string, strict = false)
```

### Parameters

<dl>
<dt>isbn</dt>
<dd>ISBN value to check</dd>
<dt>strict [Optional]</dt>
<dd>Strict mode. If `true`, syntax without hyphens is an error. If not specified, it defaults to `false`</dd>
</dl>

## Methods

<dl>
<dt>isValid(): boolean</dt>
<dd>Alias of `verifyCheckDigit()`</dd>
<dt>isIsbn13(): boolean</dt>
<dd>Whether it is a 13-digit ISBN</dd>
<dt>isIsbn10(): boolean</dt>
<dd>Whether it is a 10-digit ISBN</dd>
<dt>verifyFormat(): boolean</dt>
<dd>Verify format (do not verify check digit)</dd>
<dt>verifyCheckDigit(): boolean</dt>
<dd>Verify format including check digit (not necessarily applicable publication)</dd>
</dl>
