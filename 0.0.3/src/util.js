"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rad2deg = exports.formatBBOX = exports.formatCoordinate = exports.roundTo = exports.startsWithVowel = exports.stringifyNumber = void 0;
var SPECIAL_NUMS = ['zeroth', 'first', 'second',
    'third', 'fourth', 'fifth', 'sixth', 'seventh',
    'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth',
    'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth',
    'seventeenth', 'eighteenth', 'nineteenth'];
var DECA = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];
/**
 * Turns a number into a stringified version, i.e. 1 becomes 'first', 22 becomes
 * 'twenty-second'. numbers above 100 are returned as '# 175'.
 *
 * See  https://stackoverflow.com/a/20426113
 *
 * @param n number The number to transform
 * @returns string A spelled-out number, e.g. 'first', 'twenty-second' or '# 175'.
 */
var stringifyNumber = function (n) {
    var stringified = '';
    if (n > 100) {
        stringified = "# ".concat(n);
    }
    else if (n < 20) {
        stringified = SPECIAL_NUMS[n];
    }
    else if (n % 10 === 0) {
        stringified = DECA[Math.floor(n / 10) - 2] + 'ieth';
    }
    else {
        stringified = DECA[Math.floor(n / 10) - 2] + 'y-' + SPECIAL_NUMS[n % 10];
    }
    return stringified;
};
exports.stringifyNumber = stringifyNumber;
/**
 * Returns true if the string to test starts with 'a', 'o', 'u', 'i' or 'e', ignoring
 * casing.
 *
 * @param str string The string to test
 * @returns true if the string starts with 'a', 'o', 'u', 'i' or 'e', case-insensitive
 */
var startsWithVowel = function (str) {
    var re = /^[aouie]{1}/i;
    return re.test(str);
};
exports.startsWithVowel = startsWithVowel;
// https://stackoverflow.com/a/18358056
var roundTo = function (num, digits) {
    if (digits === void 0) { digits = 4; }
    var a = "".concat(num, "e+").concat(digits);
    var b = "e-".concat(digits);
    return +(Math.round(+a) + b);
};
exports.roundTo = roundTo;
var formatCoordinate = function (x, y, digits) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    if (digits === void 0) { digits = 4; }
    return "[".concat((0, exports.roundTo)(x, digits), ", ").concat((0, exports.roundTo)(y, digits), "]");
};
exports.formatCoordinate = formatCoordinate;
var formatBBOX = function (coords, digits) {
    if (digits === void 0) { digits = 4; }
    return [
        '[',
        "".concat((0, exports.roundTo)(coords[0], digits), ", ").concat((0, exports.roundTo)(coords[1], digits), ", "),
        "".concat((0, exports.roundTo)(coords[2], digits), ", ").concat((0, exports.roundTo)(coords[3], digits)),
        ']'
    ].join('');
};
exports.formatBBOX = formatBBOX;
var rad2deg = function (rad) {
    if (rad === void 0) { rad = 0; }
    return rad * (180 / Math.PI);
};
exports.rad2deg = rad2deg;
//# sourceMappingURL=util.js.map