import Feature from 'ol/Feature';
import {
  formatBBOX,
  formatCoordinate,
  getNameAttribute,
  localNum,
  makePercentInfo,
  rad2deg,
  roundTo,
  simpleStats,
  startsWithVowel,
  stringifyNumber
} from './util';


const randomAttributeName = () => {
  let s1 = btoa('' + (Math.random() || new Date())).slice(-8, -2);
  let s2 = btoa('' + (Math.random() || new Date())).slice(-8, -2);
  return `random-${s1}-${s2}`;
};
const makeFeat = (numRandomAttributes, namedAtribute) => {
  let attrNames: string[] = [];
  for (let i = 0; i < numRandomAttributes; i++) {
    attrNames.push(randomAttributeName());
  }
  attrNames.push(namedAtribute);
  attrNames.sort(() => 0.5 - Math.random());
  let properties = {};
  attrNames.forEach(attrName => {
    properties[attrName] = Math.random();
  });
  return new Feature(properties);
};


describe('utility functions', () => {
  describe('startsWithVowel', () => {
    let suffix = 'humpty';
    test('startsWithVowel, empty string', () => {
      expect(startsWithVowel('')).toBe(false);
    });
    test('startsWithVowel, lowercase a, e, o, i, u', () => {
      let checks = ['a', 'e', 'o', 'i', 'u'];
      checks.forEach(check => {
        expect(startsWithVowel(`${check}${suffix}`)).toBe(true);
      });
    });
    test('startsWithVowel, uppercase A, E, O, I, U', () => {
      let checks = ['A', 'E', 'O', 'I', 'U'];
      checks.forEach(check => {
        expect(startsWithVowel(`${check}${suffix}`)).toBe(true);
      });
    });
    test('startsWithVowel, some consonants', () => {
      let checks = ['d', 'F', 'k', 'C', 'P', 'y'];
      checks.forEach(check => {
        expect(startsWithVowel(`${check}${suffix}`)).toBe(false);
      });
    });
    test('startsWithVowel, some specialchars', () => {
      let checks = ['!', '%', '€', ':', '-', ' '];
      checks.forEach(check => {
        expect(startsWithVowel(`${check}${suffix}`)).toBe(false);
      });
    });
  });

  describe('stringifyNumber', () => {
    test('transforms 1, 2, 3 as expected', () => {
      expect(stringifyNumber(1)).toBe('first');
      expect(stringifyNumber(2)).toBe('second');
      expect(stringifyNumber(3)).toBe('third');
    });
    test('transforms 11, 22, 33 as expected', () => {
      expect(stringifyNumber(11)).toBe('eleventh');
      expect(stringifyNumber(22)).toBe('twenty-second');
      expect(stringifyNumber(33)).toBe('thirty-third');
    });
    test('transforms 20, 30, 70 as expected', () => {
      expect(stringifyNumber(20)).toBe('twentieth');
      expect(stringifyNumber(30)).toBe('thirtieth');
      expect(stringifyNumber(70)).toBe('seventieth');
    });
    test('transforms 111, 122, 533 as expected', () => {
      expect(stringifyNumber(111)).toBe('# 111');
      expect(stringifyNumber(122)).toBe('# 122');
      expect(stringifyNumber(533)).toBe('# 533');
    });
  });

  describe('roundTo', () => {
    test('basic rounding with defaults', () => {
      expect(roundTo(1)).toBe(1);
      expect(roundTo(-1)).toBe(-1);
      expect(roundTo(1.00005)).toBe(1.0001);
      expect(roundTo(-1.00005)).toBe(-1.0001);
    });
    test('digits can be configured', () => {
      expect(roundTo(1.00005, 3)).toBe(1);
      expect(roundTo(-1.00005, 3)).toBe(-1);
      expect(roundTo(1.00005, 7)).toBe(1.00005);
      expect(roundTo(-1.00005, 7)).toBe(-1.00005);
    });
  });

  describe('formatCoordinate', () => {
    test('when not passed arguments', () => {
      expect(formatCoordinate()).toStrictEqual('[0, 0]');
    });
    test('when either x or y is passed', () => {
      expect(formatCoordinate(1)).toStrictEqual('[1, 0]');
      expect(formatCoordinate(undefined, 1)).toStrictEqual('[0, 1]');
    });
    test('when no digits param is passed, but x and y', () => {
      expect(formatCoordinate(1, 2)).toStrictEqual('[1, 2]');
      expect(formatCoordinate(1.01, 2.02)).toStrictEqual('[1.01, 2.02]');
      expect(formatCoordinate(1.00001, 2.00002)).toStrictEqual('[1, 2]');
    });
    test('handling of negative coords', () => {
      expect(formatCoordinate(-1, -2)).toStrictEqual('[-1, -2]');
      expect(formatCoordinate(-1.00005, -2.00005)).toStrictEqual('[-1.0001, -2.0001]');
      expect(formatCoordinate(-1.00001, -2.00002)).toStrictEqual('[-1, -2]');
    });
    test('decimal precission can be configured', () => {
      expect(formatCoordinate(-1.00001, -2.00002, 5)).toStrictEqual('[-1.00001, -2.00002]');
    });
  });

  describe('formatBBOX', () => {
    test('standard formatting', () => {
      let bbox = [1, 2, 3, 4];
      expect(formatBBOX(bbox)).toStrictEqual('[1, 2, 3, 4]');
      bbox = [-1, -2, 3.3, 4.4];
      expect(formatBBOX(bbox)).toStrictEqual('[-1, -2, 3.3, 4.4]');
    });
    test('rounds to 4 decimal places by default', () => {
      let bbox = [1.000000001, -2.55555, 3, 4];
      expect(formatBBOX(bbox)).toStrictEqual('[1, -2.5556, 3, 4]');
    });
    test('number of decimal places is configurable', () => {
      let bbox = [1.000001, -2.55555, 3, 4];
      expect(formatBBOX(bbox, 6)).toStrictEqual('[1.000001, -2.55555, 3, 4]');
    });
  });

  describe('rad2deg', () => {
    expect(rad2deg(Math.PI)).toBe(180);
    expect(rad2deg(2 * Math.PI)).toBe(360);
    expect(rad2deg(-Math.PI / 4)).toBe(-45);
    expect(rad2deg(-Math.PI * 1.5)).toBe(-270);
  });

  describe('getNameAttribute', () => {
    test('returns empty string when call wo/ feature', () => {
      expect(getNameAttribute()).toStrictEqual('');
    });
    test('finds lower case variants of "name", "nom", "nombre", "naam"', () => {
      let feat;
      feat = makeFeat(10, 'name');
      expect(getNameAttribute(feat)).toStrictEqual('name');
      feat = makeFeat(10, 'nom');
      expect(getNameAttribute(feat)).toStrictEqual('nom');
      feat = makeFeat(10, 'nombre');
      expect(getNameAttribute(feat)).toStrictEqual('nombre');
      feat = makeFeat(10, 'naam');
      expect(getNameAttribute(feat)).toStrictEqual('naam');
    });
    test('finds mixed case variants of "name", "nom", "nombre", "naam"', () => {
      let feat;
      feat = makeFeat(10, 'nAme');
      expect(getNameAttribute(feat)).toStrictEqual('nAme');
      feat = makeFeat(10, 'noM');
      expect(getNameAttribute(feat)).toStrictEqual('noM');
      feat = makeFeat(10, 'Nombre');
      expect(getNameAttribute(feat)).toStrictEqual('Nombre');
      feat = makeFeat(10, 'NAAM');
      expect(getNameAttribute(feat)).toStrictEqual('NAAM');
    });
    test('ignores whitespace around "name", "nom", "nombre", "naam"', () => {
      let feat;
      feat = makeFeat(10, ' name');
      expect(getNameAttribute(feat)).toStrictEqual(' name');
      feat = makeFeat(10, 'noM  ');
      expect(getNameAttribute(feat)).toStrictEqual('noM  ');
      feat = makeFeat(10, '\t\t\tNombre\n\n');
      expect(getNameAttribute(feat)).toStrictEqual('\t\t\tNombre\n\n');
      feat = makeFeat(10, ' NAAM ');
      expect(getNameAttribute(feat)).toStrictEqual(' NAAM ');
    });
  });

  describe('simpleStats', () => {
    const rec1 = { foo: 3, bar: 0.1, baz: 'cos', name: 'Humpty' };
    const rec2 = { foo: 2, bar: 0.2, baz: 'sin', name: 'Dumpty' };
    const rec3 = { foo: 1, bar: -0.5, baz: 'tan', name: 'Trumpty' };
    const dataset1 = [rec1, rec2, rec3];
    const got1: any = simpleStats(dataset1, ['foo', 'bar'], 'name');
    test('returns correct min value for "foo"', () => {
      expect(got1.foo.min).toBe(1);
    });
    test('returns correct max value for "foo"', () => {
      expect(got1.foo.max).toBe(3);
    });
    test('returns correct name for the lowest "foo"', () => {
      expect(got1.foo.minName).toBe('Trumpty');
    });
    test('returns correct name for the highest "foo"', () => {
      expect(got1.foo.maxName).toBe('Humpty');
    });
    test('returns correct sum value for "foo"', () => {
      expect(got1.foo.sum).toBe(6);
    });
    test('returns correct avg value for "foo"', () => {
      expect(got1.foo.avg).toBe(6 / 3);
    });

    test('returns correct min value for "bar"', () => {
      expect(got1.bar.min).toBe(-0.5);
    });
    test('returns correct max value for "bar"', () => {
      expect(got1.bar.max).toBe(0.2);
    });
    test('returns correct name for the lowest "bar"', () => {
      expect(got1.bar.minName).toBe('Trumpty');
    });
    test('returns correct name for the highest "bar"', () => {
      expect(got1.bar.maxName).toBe('Dumpty');
    });
    test('returns correct sum value for "bar"', () => {
      expect(got1.bar.sum).toBe(0.1 + 0.2 - 0.5);
    });
    test('returns correct avg value for "bar"', () => {
      expect(got1.bar.avg).toBe((0.1 + 0.2 - 0.5) / 3);
    });

    describe('with empty datasets, or empty columns we get an empty object', () => {
      expect(simpleStats([], [], '')).toStrictEqual({});
      expect(simpleStats([rec1], [], '')).toStrictEqual({});
      expect(simpleStats([], ['foo'], '')).toStrictEqual({});
    });

    describe('no stats for unexpected columns, no names for unexpected name columns', () => {
      const rec4 = { foo: 3 };
      const rec5 = { foo: 2 };
      const rec6 = { foo: 1 };
      const dataset2 = [rec4, rec5, rec6];
      const got2: any = simpleStats(dataset2, ['foo', 'miss'], 'not-there');
      expect('miss' in got2).toBe(false);
      expect(got2.foo.min).toBe(1);
      expect(got2.foo.minName).toBe(undefined);
    });

  });

  describe('localNum', () => {
    test('should return an empty string when num is undefined', () => {
      const result = localNum(undefined);
      expect(result).toBe('');
    });

    test('should localize a positive integer', () => {
      const result = localNum(1234567);
      expect(result).toBe('1,234,567');
    });

    test('should localize a negative integer', () => {
      const result = localNum(-9876543);
      expect(result).toBe('-9,876,543');
    });

    test('should localize a floating-point number', () => {
      const result = localNum(1234.567);
      expect(result).toBe('1,234.567');
    });

    test('should localize zero', () => {
      const result = localNum(0);
      expect(result).toBe('0');
    });

    test('should not modify a string input', () => {
      const result = localNum('1234567' as any); // Using 'as any' to force a string input for testing
      expect(result).toBe('1234567');
    });
  });

  describe('makePercentInfo', () => {
    expect(makePercentInfo()).toStrictEqual('');
    expect(makePercentInfo(1)).toStrictEqual('');
    expect(makePercentInfo(undefined, 2)).toStrictEqual('');
    expect(makePercentInfo(1, 2)).toStrictEqual(' (50%)');
    expect(makePercentInfo(2, 1)).toStrictEqual(' (200%)');
    expect(makePercentInfo(1589.111, 10000)).toStrictEqual(' (15.89%)');
  });

});
