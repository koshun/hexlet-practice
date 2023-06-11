import generator from '../src/Hellpers/generatorHelper.js';

describe('returns the required number of characters', () => {
  const params = {
    // pwdLength: 1,
    useDigits: true,
    useLowerCase: false,
    useUpperCase: false,
    useSymbols: true,
  };
  for (let i = 1; i < 10; i += 1) {
    test('returns the required number of characters.', () => {
      params.pwdLength = i;
      const gen = generator(params);
      expect(gen.password).toHaveLength(i);
    });
  }
});

describe('test generator without object parameter', () => {
  test('must return blank line', () => {
    const { password } = generator({});
    expect(password).toEqual('');
  });
});

describe('test generator function', () => {
  for (let i = 1; i < 10; i += 1) {
    test('returns only numbers', () => {
      const expected = expect.stringMatching(/\d/);
      const params = {
        // pwdLength: 5,
        useDigits: true,
        useLowerCase: false,
        useUpperCase: false,
        useSymbols: false,
      };
      params.pwdLength = i;
      const { password } = generator(params);
      expect(password).toEqual(expected);
    });
    test('returns numbers and lower&uppser letters', () => {
      const expected = expect.stringMatching(/\w/);
      const params = {
        // pwdLength: 5,
        useDigits: true,
        useLowerCase: true,
        useUpperCase: true,
        useSymbols: false,
      };
      params.pwdLength = i;
      const { password } = generator(params);
      expect(password).toEqual(expected);
    });
    test('return hard password', () => {
      const expected = expect.stringMatching(/.*/);
      const params = {
        // pwdLength: 5,
        useDigits: true,
        useLowerCase: true,
        useUpperCase: true,
        useSymbols: true,
      };
      params.pwdLength = i;
      const { password } = generator(params);
      expect(password).toEqual(expected);
    });
    test('return lower and upper symbols', () => {
      const expected = expect.stringMatching(/[a-zA-Z]+/);
      const params = {
        // pwdLength: 5,
        useDigits: false,
        useLowerCase: true,
        useUpperCase: true,
        useSymbols: false,
      };
      params.pwdLength = i;
      const { password } = generator(params);
      expect(password).toEqual(expected);
    });
  }
});
