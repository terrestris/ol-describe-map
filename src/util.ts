import Feature from 'ol/Feature';
import { ViewDescriberFunc, LayerDescriberFunc } from './types';

const SPECIAL_NUMS = ['zeroth', 'first', 'second',
  'third', 'fourth', 'fifth', 'sixth', 'seventh',
  'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth',
  'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth',
  'seventeenth', 'eighteenth', 'nineteenth'];
const DECA = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

/**
 * Turns a number into a stringified version, i.e. 1 becomes 'first', 22 becomes
 * 'twenty-second'. numbers above 100 are returned as '# 175'.
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
 * Localizes the given number and returns it with thousands seperator and decimal
 * seperator for the language code en-GB.
 *
 * @param num:number|undefined the number to localize
 * @returns string the localized number.
 */
export const localNum = (num: number|undefined): string => {
  if (num === undefined) {
    return '';
  }
  return num.toLocaleString('en-GB');
};

/**
 * Returns `true` if the string to test starts with 'a', 'o', 'u', 'i' or 'e', ignoring
 * casing, `false` otherwise.
 *
 * @param str string The string to test
 * @returns boolean True if the string starts with 'a', 'o', 'u', 'i' or 'e',
 *   case-insensitive, false otherwise.
 */
export const startsWithVowel = (str: string): boolean => {
  let re: RegExp = /^[aouie]{1}/i;
  return re.test(str);
};

/**
 * See https://stackoverflow.com/a/18358056
 *
 * @param num
 * @param digits
 * @returns
 */
export const roundTo = (num: number, digits: number = 4): number => {
  if (num < 0) {
    return -roundTo(-num, digits);
  }
  let a = `${num}e+${digits}`;
  let b = `e-${digits}`;
  return +(Math.round(+a) + b);
};

/**
 *
 * @param x
 * @param y
 * @param digits
 * @returns
 */
export const formatCoordinate = (x: number = 0, y: number = 0, digits = 4): string => {
  return `[${roundTo(x, digits)}, ${roundTo(y, digits)}]`;
};

/**
 *
 * @param coords
 * @param digits
 * @returns
 */
export const formatBBOX = (coords: number[], digits = 4): string => {
  return [
    '[',
    `${roundTo(coords[0], digits)}, ${roundTo(coords[1], digits)}, `,
    `${roundTo(coords[2], digits)}, ${roundTo(coords[3], digits)}`,
    ']'
  ].join('');
};

/**
 *
 * @param rad
 * @returns
 */
export const rad2deg = (rad: number = 0): number => rad * (180 / Math.PI);

/**
 *
 * @param feature
 * @returns
 */
export const getNameAttribute = (feature: Feature|undefined = undefined): string => {
  if (feature === undefined) {
    return '';
  }
  // https://www.indifferentlanguages.com/words/name
  const candidates = ['name', 'nom', 'nombre', 'naam'];
  const attributes = feature.getProperties();
  const attributeKeys = Object.keys(attributes);
  let nameAttribute: string = '';
  candidates.some((candidate) => {
    if (candidate in attributes) {
      nameAttribute = candidate;
    } else {
      let candidateRegEx = new RegExp(`^\\s*${candidate}\\s*$`, 'i');
      attributeKeys.some((attributeKey) => {
        if (candidateRegEx.test(attributeKey)) {
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


/**
 *
 * @param data object[]
 * @param keys string[]
 * @param nameAttribute string
 * @returns
 */
export const simpleStats = (data: object[], keys: string[], nameAttribute: string): object => {
  let stats = {};
  if (keys.length < 1 || data.length  < 1) {
    return stats;
  }
  keys.forEach(key => {
    let min = +Infinity;
    let max = -Infinity;
    let avg = NaN;
    let sum = 0;
    let minName = undefined;
    let maxName = undefined;
    data.forEach((record: object) => {
      if (key in record) {
        let val: number = (record as any)[key] as number;
        let name: string = nameAttribute in record ? (record as any)[nameAttribute] : undefined;
        if (val < min) {
          min = val;
          minName = name;
        }
        if (val > max) {
          max = val;
          maxName = name;
        }
        sum += val;
      }
    });
    avg = sum / data.length;
    if (min !== Infinity) {
      (stats as any)[key] = {min, max, avg, sum, minName, maxName };
    }
  });
  return stats;
};

/**
 * Calculates, formnats and returns a percentage of the `share` of the `total`.
 *
 * @param share number|undefined The absolute number of the share.
 * @param total number|undefined The toital nomber the share is a part of.
 * @returns string A percentage of the share of the total, wrapped in parentheses, and
 *   with a leading space.
 */
export const makePercentInfo = (share: number|undefined = undefined, total: number|undefined = undefined): string => {
  if (total === 0 || share === undefined || total === undefined || isNaN(total) ) {
    return '';
  }
  return ` (${roundTo(100 * (share / total), 2)}%)`;
};

const wmsResponseCache: { [key: string]: string } = {};
export const getWmsResponse = async (url: string, params: object): Promise<string> => {
  let responseTxt = '';
  let cacheKey = `_url:${encodeURIComponent(url)}`;
  for (let [k, v] of Object.entries(params)) {
    cacheKey = `${cacheKey}_${encodeURIComponent(k)}:${encodeURIComponent(v)}`;
  }
  if (!wmsResponseCache[cacheKey]) {
    let wmsUrl = new URL(url);
    for (let [k, v] of Object.entries(params)) {
      wmsUrl.searchParams.set(k, v);
    }
    responseTxt = await fetch(wmsUrl.toString()).then(resp => resp.text());
    wmsResponseCache[cacheKey] = responseTxt;
  }
  return wmsResponseCache[cacheKey];
};

export const voidViewDescriber: ViewDescriberFunc = async () => {
  return {};
};

export const voidLayersDescriber: LayerDescriberFunc = async () => {
  return {
    type: '',
    source: '',
    details: null
  };
};
