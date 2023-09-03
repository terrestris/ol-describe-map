import {
  startsWithVowel,
  stringifyNumber
} from './util';

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
    test('transforms 1, 2, 3 as expected', () =>  {
      expect(stringifyNumber(1)).toBe('first');
      expect(stringifyNumber(2)).toBe('second');
      expect(stringifyNumber(3)).toBe('third');
    });
    test('transforms 11, 22, 33 as expected', () =>  {
      expect(stringifyNumber(11)).toBe('eleventh');
      expect(stringifyNumber(22)).toBe('twenty-second');
      expect(stringifyNumber(33)).toBe('thirty-third');
    });
    test('transforms 20, 30, 70 as expected', () =>  {
      expect(stringifyNumber(20)).toBe('twentieth');
      expect(stringifyNumber(30)).toBe('thirtieth');
      expect(stringifyNumber(70)).toBe('seventieth');
    });
    test('transforms 111, 122, 533 as expected', () =>  {
      expect(stringifyNumber(111)).toBe('# 111');
      expect(stringifyNumber(122)).toBe('# 122');
      expect(stringifyNumber(533)).toBe('# 533');
    });
  });
});
