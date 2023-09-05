/**
 * Turns a number into a stringified version, i.e. 1 becomes 'first', 22 becomes
 * 'twenty-second'. numbers above 100 are returnes as '# 175'.
 *
 * See  https://stackoverflow.com/a/20426113
 *
 * @param n number The number to transform
 * @returns string A spelled-out number, e.g. 'first', 'twenty-second' or '# 175'.
 */
export declare const stringifyNumber: (n: number) => string;
/**
 * Returns true if the string to test starts with 'a', 'o', 'u', 'i' or 'e', ignoring
 * casing.
 *
 * @param str string The string to test
 * @returns true if the string starts with 'a', 'o', 'u', 'i' or 'e', case-insensitive
 */
export declare const startsWithVowel: (str: string) => boolean;
export declare const roundTo: (num: number, digits?: number) => number;
export declare const formatCoordinate: (x?: number, y?: number, digits?: number) => string;
export declare const formatBBOX: (coords: number[], digits?: number) => string;
export declare const rad2deg: (rad?: number) => number;
