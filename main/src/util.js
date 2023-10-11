"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePercentInfo = exports.simpleStats = exports.getNameAttribute = exports.rad2deg = exports.formatBBOX = exports.formatCoordinate = exports.roundTo = exports.startsWithVowel = exports.localNum = exports.stringifyNumber = void 0;
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
 * Localizes the given number and returns it with thousands seperator and decimal
 * seperator for the language code en-GB.
 *
 * @param num:number|undefined the number to localize
 * @returns string the localized number.
 */
var localNum = function (num) {
    if (num === undefined) {
        return '';
    }
    return num.toLocaleString('en-GB');
};
exports.localNum = localNum;
/**
 * Returns `true` if the string to test starts with 'a', 'o', 'u', 'i' or 'e', ignoring
 * casing, `false` otherwise.
 *
 * @param str string The string to test
 * @returns boolean True if the string starts with 'a', 'o', 'u', 'i' or 'e',
 *   case-insensitive, false otherwise.
 */
var startsWithVowel = function (str) {
    var re = /^[aouie]{1}/i;
    return re.test(str);
};
exports.startsWithVowel = startsWithVowel;
/**
 * See https://stackoverflow.com/a/18358056
 *
 * @param num
 * @param digits
 * @returns
 */
var roundTo = function (num, digits) {
    if (digits === void 0) { digits = 4; }
    if (num < 0) {
        return -(0, exports.roundTo)(-num, digits);
    }
    var a = "".concat(num, "e+").concat(digits);
    var b = "e-".concat(digits);
    return +(Math.round(+a) + b);
};
exports.roundTo = roundTo;
/**
 *
 * @param x
 * @param y
 * @param digits
 * @returns
 */
var formatCoordinate = function (x, y, digits) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    if (digits === void 0) { digits = 4; }
    return "[".concat((0, exports.roundTo)(x, digits), ", ").concat((0, exports.roundTo)(y, digits), "]");
};
exports.formatCoordinate = formatCoordinate;
/**
 *
 * @param coords
 * @param digits
 * @returns
 */
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
/**
 *
 * @param rad
 * @returns
 */
var rad2deg = function (rad) {
    if (rad === void 0) { rad = 0; }
    return rad * (180 / Math.PI);
};
exports.rad2deg = rad2deg;
/**
 *
 * @param feature
 * @returns
 */
var getNameAttribute = function (feature) {
    if (feature === void 0) { feature = undefined; }
    if (feature === undefined) {
        return '';
    }
    // https://www.indifferentlanguages.com/words/name
    var candidates = ['name', 'nom', 'nombre', 'naam'];
    var attributes = feature.getProperties();
    var attributeKeys = Object.keys(attributes);
    var nameAttribute = '';
    candidates.some(function (candidate) {
        if (candidate in attributes) {
            nameAttribute = candidate;
        }
        else {
            var candidateRegEx_1 = new RegExp("^\\s*".concat(candidate, "\\s*$"), 'i');
            attributeKeys.some(function (attributeKey) {
                if (candidateRegEx_1.test(attributeKey)) {
                    nameAttribute = attributeKey;
                    return true;
                }
                return false;
            });
        }
        if (nameAttribute !== '') {
            return true;
        }
        return false;
    });
    return nameAttribute;
};
exports.getNameAttribute = getNameAttribute;
/**
 *
 * @param data object[]
 * @param keys string[]
 * @param nameAttribute string
 * @returns
 */
var simpleStats = function (data, keys, nameAttribute) {
    var stats = {};
    if (keys.length < 1 || data.length < 1) {
        return stats;
    }
    keys.forEach(function (key) {
        var min = +Infinity;
        var max = -Infinity;
        var avg = NaN;
        var sum = 0;
        var minName = undefined;
        var maxName = undefined;
        data.forEach(function (record) {
            if (key in record) {
                var val = record[key];
                var name_1 = nameAttribute in record ? record[nameAttribute] : undefined;
                if (val < min) {
                    min = val;
                    minName = name_1;
                }
                if (val > max) {
                    max = val;
                    maxName = name_1;
                }
                sum += val;
            }
        });
        avg = sum / data.length;
        if (min !== Infinity) {
            stats[key] = { min: min, max: max, avg: avg, sum: sum, minName: minName, maxName: maxName };
        }
    });
    return stats;
};
exports.simpleStats = simpleStats;
/**
 * Calculates, formnats and returns a percentage of the `share` of the `total`.
 *
 * @param share number|undefined The absolute number of the share.
 * @param total number|undefined The toital nomber the share is a part of.
 * @returns string A percentage of the share of the total, wrapped in parentheses, and
 *   with a leading space.
 */
var makePercentInfo = function (share, total) {
    if (share === void 0) { share = undefined; }
    if (total === void 0) { total = undefined; }
    if (total === 0 || share === undefined || total === undefined || isNaN(total)) {
        return '';
    }
    return " (".concat((0, exports.roundTo)(100 * (share / total), 2), "%)");
};
exports.makePercentInfo = makePercentInfo;
//# sourceMappingURL=util.js.map