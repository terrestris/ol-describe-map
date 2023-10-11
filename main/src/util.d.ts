import Feature from 'ol/Feature';
/**
 * Turns a number into a stringified version, i.e. 1 becomes 'first', 22 becomes
 * 'twenty-second'. numbers above 100 are returned as '# 175'.
 *
 * See  https://stackoverflow.com/a/20426113
 *
 * @param n number The number to transform
 * @returns string A spelled-out number, e.g. 'first', 'twenty-second' or '# 175'.
 */
export declare const stringifyNumber: (n: number) => string;
/**
 * Localizes the given number and returns it with thousands seperator and decimal
 * seperator for the language code en-GB.
 *
 * @param num:number|undefined the number to localize
 * @returns string the localized number.
 */
export declare const localNum: (num: number | undefined) => string;
/**
 * Returns `true` if the string to test starts with 'a', 'o', 'u', 'i' or 'e', ignoring
 * casing, `false` otherwise.
 *
 * @param str string The string to test
 * @returns boolean True if the string starts with 'a', 'o', 'u', 'i' or 'e',
 *   case-insensitive, false otherwise.
 */
export declare const startsWithVowel: (str: string) => boolean;
/**
 * See https://stackoverflow.com/a/18358056
 *
 * @param num
 * @param digits
 * @returns
 */
export declare const roundTo: (num: number, digits?: number) => number;
/**
 *
 * @param x
 * @param y
 * @param digits
 * @returns
 */
export declare const formatCoordinate: (x?: number, y?: number, digits?: number) => string;
/**
 *
 * @param coords
 * @param digits
 * @returns
 */
export declare const formatBBOX: (coords: number[], digits?: number) => string;
/**
 *
 * @param rad
 * @returns
 */
export declare const rad2deg: (rad?: number) => number;
/**
 *
 * @param feature
 * @returns
 */
export declare const getNameAttribute: (feature?: Feature | undefined) => string;
/**
 *
 * @param data object[]
 * @param keys string[]
 * @param nameAttribute string
 * @returns
 */
export declare const simpleStats: (data: object[], keys: string[], nameAttribute: string) => object;
/**
 * Calculates, formnats and returns a percentage of the `share` of the `total`.
 *
 * @param share number|undefined The absolute number of the share.
 * @param total number|undefined The toital nomber the share is a part of.
 * @returns string A percentage of the share of the total, wrapped in parentheses, and
 *   with a leading space.
 */
export declare const makePercentInfo: (share?: number | undefined, total?: number | undefined) => string;
