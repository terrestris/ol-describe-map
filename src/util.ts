const SPECIAL_NUMS = ['zeroth', 'first', 'second',
  'third', 'fourth', 'fifth', 'sixth', 'seventh',
  'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth',
  'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
const DECA = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

/**
 * Turns a number into a stringified version, i.e. 1 becomes 'first', 22 becomes
 * 'twenty-second'. numbers above 100 are returnes as '# 175'.
 *
 * See  https://stackoverflow.com/a/20426113
 *
 * @param n number The number to transform
 * @returns string A spelled-out number, e.g. 'first', 'twenty-second' or '# 175'.
 */
export const stringifyNumber = (n: number): string => {
  let stringified = '';
  if (n > 100) {
    stringified = `# ${n}`;
  } else if (n < 20) {
    stringified = SPECIAL_NUMS[n];
  } else if (n % 10 === 0) {
    stringified = DECA[Math.floor(n / 10) - 2] + 'ieth';
  } else {
    stringified =  DECA[Math.floor(n / 10) - 2] + 'y-' + SPECIAL_NUMS[n % 10];
  }
  return stringified;
};

/**
 * Returns true if the string to test starts with 'a', 'o', 'u', 'i' or 'e', ignoring
 * casing.
 *
 * @param str string The string to test
 * @returns true if the string starts with 'a', 'o', 'u', 'i' or 'e', case-insensitive
 */
export const startsWithVowel = (str: string): boolean => {
  let re: RegExp = /^[aouie]{1}/i;
  return re.test(str);
};
