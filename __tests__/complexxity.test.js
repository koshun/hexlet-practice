import testComplexity from '../src/Hellpers/testComplexity.js';
import generator from '../src/Hellpers/generatorHelper.js';

describe('Возвращает величину, что соотвествует надёжности пароля', () => {
  test('Возвращает данные с использованием 10 символов и больших и маленьких букв и чисел', () => {
    const { password } = generator({
      pwdLength: 10,
      useLowerCase: true,
      useUpperCase: true,
      useSymbols: false,
      useDigits: true,
    });
    expect(testComplexity(password)).toBeGreaterThanOrEqual(55);
  });
  test('Проверка с использованием 12 символов включающие в себя всё возможное', () => {
    const { password } = generator({
      pwdLength: 12,
      useLowerCase: true,
      useUpperCase: true,
      useSymbols: true,
      useDigits: true,
    });
    expect(testComplexity(password)).toBeGreaterThanOrEqual(73);
  });
  test('Только нижний регистр', () => {
    const { password } = generator({
      pwdLength: 10,
      useLowerCase: true,
      useUpperCase: false,
      useSymbols: false,
      useDigits: false,
    });
    expect(testComplexity(password)).toEqual(47);
  });
  test('Маленькие и большие', () => {
    const { password } = generator({
      pwdLength: 10,
      useLowerCase: true,
      useUpperCase: true,
      useSymbols: false,
      useDigits: false,
    });
    expect(testComplexity(password)).toEqual(57);
  });
});
