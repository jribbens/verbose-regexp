"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const __1 = require("../");
describe('rx', () => {
    it('should compile regular expressions', () => {
        const regexp = __1.rx `hello`;
        assert_1.default(regexp instanceof RegExp);
        assert_1.default.strictEqual(regexp.source, 'hello');
        assert_1.default.strictEqual(regexp.flags, '');
    });
    it('should ignore verbose white space', () => {
        const regexp = __1.rx `
    
    
    hello
    

    there
    

    `;
        assert_1.default(regexp instanceof RegExp);
        assert_1.default.strictEqual(regexp.source, 'hellothere');
        assert_1.default.strictEqual(regexp.flags, '');
    });
    it('should not ignore in-line white space', () => {
        const regexp = __1.rx `  hello    there  `;
        assert_1.default(regexp instanceof RegExp);
        assert_1.default.strictEqual(regexp.source, '  hello    there  ');
        assert_1.default.strictEqual(regexp.flags, '');
    });
    it('should allow comments', () => {
        const regexp = __1.rx `
    // pay me no heed
    
    hello   // you can't see me
    

    there   // this is irrelevant\ yes it is
    

    `;
        assert_1.default(regexp instanceof RegExp);
        assert_1.default.strictEqual(regexp.source, 'hellothere');
        assert_1.default.strictEqual(regexp.flags, '');
    });
    it('should preserve backslashes', () => {
        const regexp = __1.rx `jam\x20tomorrow`;
        assert_1.default(regexp instanceof RegExp);
        assert_1.default.strictEqual(regexp.source, 'jam\\x20tomorrow');
        assert_1.default.strictEqual(regexp.flags, '');
    });
    it('should allow interpolation', () => {
        const foo = 'folk\x73';
        const bar = 'evening';
        const regexp = __1.rx.i `hello ${foo}! Good ${bar}.`;
        assert_1.default(regexp instanceof RegExp);
        assert_1.default.strictEqual(regexp.source, 'hello folks! Good evening.');
        assert_1.default.strictEqual(regexp.flags, 'i');
    });
    it('should allow single flags', () => {
        const regexp = __1.rx.i `hello`;
        assert_1.default(regexp instanceof RegExp);
        assert_1.default.strictEqual(regexp.source, 'hello');
        assert_1.default.strictEqual(regexp.flags, 'i');
    });
    it('should allow multiple flags', () => {
        const regexp = __1.rx.gi `hello`;
        assert_1.default(regexp instanceof RegExp);
        assert_1.default.strictEqual(regexp.source, 'hello');
        assert_1.default.strictEqual(regexp.flags, 'gi');
    });
    it('should allow multiple flags in any order', () => {
        const regexp = __1.rx.ig `hello`;
        assert_1.default(regexp instanceof RegExp);
        assert_1.default.strictEqual(regexp.source, 'hello');
        assert_1.default.strictEqual(regexp.flags, 'gi');
    });
    it('should reject invalid regex flags', () => {
        assert_1.default.throws(() => __1.rx.x `hello`, SyntaxError);
    });
    it('should work with the date example', () => {
        const dateTime = __1.rx `
      (\d{4}-\d{2}-\d{2}) // date
      T                   // time separator
      (\d{2}:\d{2}:\d{2}) // time
    `;
        const result = dateTime.exec(new Date('2020-05-24T12:34:56Z').toISOString());
        assert_1.default(result !== null);
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
        assert_1.default(result !== null);
        assert_1.default.strictEqual(result[1], 'https');
        assert_1.default.strictEqual(result[2], 'example.com');
        assert_1.default.strictEqual(result[3], '/foo');
    });
});
//# sourceMappingURL=index.js.map