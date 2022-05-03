"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rx = void 0;
function trim(str) {
    return str.replace(/\/\/.*/g, '').replace(/ *\n */g, '');
}
function parse(template, ...subs) {
    return subs.reduce((result, sub, i) => result + String(sub) + trim(template.raw[i + 1]), trim(template.raw[0]));
}
const _rx = ((template, ...args) => new RegExp(parse(template, ...args)));
exports.rx = new Proxy(_rx, {
    get(target, flags) {
        return function (template, ...args) {
            return new RegExp(parse(template, ...args), flags);
        };
    }
});
//# sourceMappingURL=index.js.map