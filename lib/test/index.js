"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const __1 = require("../");
describe('rx', () => {
    it('should compile regular expressions', () => {
        const regexp = (0, __1.rx) `hello`;
        (0, assert_1.default)(regexp instanceof RegExp);
        assert_1.default.strictEqual(regexp.source, 'hello');
        assert_1.default.strictEqual(regexp.flags, '');
    });
    it('should ignore verbose white space', () => {
        const regexp = (0, __1.rx) `
    
    
    hello
    

    there
    

    `;
        (0, assert_1.default)(regexp instanceof RegExp);
        assert_1.default.strictEqual(regexp.source, 'hellothere');
        assert_1.default.strictEqual(regexp.flags, '');
    });
    it('should not ignore in-line white space', () => {
        const regexp = (0, __1.rx) `  hello    there  `;
        (0, assert_1.default)(regexp instanceof RegExp);
        assert_1.default.strictEqual(regexp.source, '  hello    there  ');
        assert_1.default.strictEqual(regexp.flags, '');
    });
    it('should allow comments', () => {
        const regexp = (0, __1.rx) `
    // pay me no heed
    
    hello   // you can't see me
    

    there   // this is irrelevant\ yes it is
    

    `;
        (0, assert_1.default)(regexp instanceof RegExp);
        assert_1.default.strictEqual(regexp.source, 'hellothere');
        assert_1.default.strictEqual(regexp.flags, '');
    });
    it('should preserve backslashes', () => {
        const regexp = (0, __1.rx)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["jam tomorrow"], ["jam\\x20tomorrow"])));
        (0, assert_1.default)(regexp instanceof RegExp);
        assert_1.default.strictEqual(regexp.source, 'jam\\x20tomorrow');
        assert_1.default.strictEqual(regexp.flags, '');
    });
    it('should allow interpolation', () => {
        const foo = 'folk\x73';
        const bar = 'evening';
        const regexp = __1.rx.i `hello ${foo}! Good ${bar}.`;
        (0, assert_1.default)(regexp instanceof RegExp);
        assert_1.default.strictEqual(regexp.source, 'hello folks! Good evening.');
        assert_1.default.strictEqual(regexp.flags, 'i');
    });
    it('should allow single flags', () => {
        const regexp = __1.rx.i `hello`;
        (0, assert_1.default)(regexp instanceof RegExp);
        assert_1.default.strictEqual(regexp.source, 'hello');
        assert_1.default.strictEqual(regexp.flags, 'i');
    });
    it('should allow multiple flags', () => {
        const regexp = __1.rx.gi `hello`;
        (0, assert_1.default)(regexp instanceof RegExp);
        assert_1.default.strictEqual(regexp.source, 'hello');
        assert_1.default.strictEqual(regexp.flags, 'gi');
    });
    it('should allow multiple flags in any order', () => {
        const regexp = __1.rx.ig `hello`;
        (0, assert_1.default)(regexp instanceof RegExp);
        assert_1.default.strictEqual(regexp.source, 'hello');
        assert_1.default.strictEqual(regexp.flags, 'gi');
    });
    it('should reject invalid regex flags', () => {
        assert_1.default.throws(() => __1.rx.x `hello`, SyntaxError);
    });
    it('should work with the date example', () => {
        const dateTime = (0, __1.rx) `
      (\d{4}-\d{2}-\d{2}) // date
      T                   // time separator
      (\d{2}:\d{2}:\d{2}) // time
    `;
        const result = dateTime.exec(new Date('2020-05-24T12:34:56Z').toISOString());
        (0, assert_1.default)(result !== null);
        assert_1.default.strictEqual(result[1], '2020-05-24');
        assert_1.default.strictEqual(result[2], '12:34:56');
    });
    it('should work with the URL example', () => {
        const url = __1.rx.i `
      [ ]*([a-z]+):\/\/ // scheme
      ([^/]+)           // location
      (/.*)?            // path
    `;
        const result = url.exec('   https://example.com/foo');
        (0, assert_1.default)(result !== null);
        assert_1.default.strictEqual(result[1], 'https');
        assert_1.default.strictEqual(result[2], 'example.com');
        assert_1.default.strictEqual(result[3], '/foo');
    });
    it('should allow embedded regexps', () => {
        const date = (0, __1.rx) `\d{4}-\d{2}-\d{2}`;
        const time = (0, __1.rx) `\d{2}:\d{2}:\d{2}`;
        const dateTime = (0, __1.rx) `(${date})T(${time})`;
        const result = dateTime.exec(new Date('2020-05-24T12:34:56Z').toISOString());
        (0, assert_1.default)(result !== null);
        assert_1.default.strictEqual(result[1], '2020-05-24');
        assert_1.default.strictEqual(result[2], '12:34:56');
    });
    it('embedded regexps should be atomic', () => {
        const aorb = (0, __1.rx) `a|b`;
        const aorbthenc = (0, __1.rx) `${aorb}c`;
        (0, assert_1.default)(aorbthenc.test('ac'));
        (0, assert_1.default)(aorbthenc.test('bc'));
        (0, assert_1.default)(!aorbthenc.test('a'));
    });
});
var templateObject_1;
//# sourceMappingURL=index.js.map