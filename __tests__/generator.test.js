import generator from '../src/generator.js';

describe('test generator function', () => {
  test('returns the required number of characters.', () => {
    const params = {
      pwdLength: 5,
      useDigits: true,
      useLowerCase: false,
      useUpperCase: false,
      useSymbols: true,
    };
    const gen = generator(params);
    expect(gen.password).toHaveLength(5);
  });
  test('returns only numbers', () => {
    const expected = expect.stringMatching(/\d/);
    const params = {
      pwdLength: 5,
      useDigits: true,
      useLowerCase: false,
      useUpperCase: false,
      useSymbols: false,
    };
    const { password } = generator(params);
    expect(password).toEqual(expected);
  });
  test('returns numbers and lower&uppser letters', () => {
    const expected = expect.stringMatching(/\w/);
    const params = {
      pwdLength: 5,
      useDigits: true,
      useLowerCase: true,
      useUpperCase: true,
      useSymbols: false,
    };
    const { password } = generator(params);
    expect(password).toEqual(expected);
  });
  test('return hard password', () => {
    const expected = expect.stringMatching(/.*/);
    const params = {
      pwdLength: 5,
      useDigits: true,
      useLowerCase: true,
      useUpperCase: true,
      useSymbols: true,
    };
    const { password } = generator(params);
    expect(password).toEqual(expected);
  });
  test('return lower and upper symbols', () => {
    const expected = expect.stringMatching(/[a-zA-Z]+/);
    const params = {
      pwdLength: 5,
      useDigits: false,
      useLowerCase: true,
      useUpperCase: true,
      useSymbols: false,
    };
    const { password } = generator(params);
    expect(password).toEqual(expected);
  });
});
