const digits = '0123456789';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const symbols = ' !@#$%^&*_-+=`|\\(){}[]:;"\'<>,.?/';
const getRandomInt = (min, max) => Math.floor(min + Math.random() * (max - min + 1));
const calcComplexity = (pwdLen, charSetLen) => Math.round(Math.log2(charSetLen ** pwdLen), 2);

const generator = (params) => {
  let password = '';
  let charSet = '';
  const length = params.pwdLength;
  if (params.useDigits) {
    charSet += digits;
  }
  if (params.useLowerCase) {
    charSet += lowercase;
  }
  if (params.useUpperCase) {
    charSet += uppercase;
  }
  if (params.useSymbols) {
    charSet += symbols;
  }
  for (let i = 0; i < length; i += 1) {
    password += charSet.charAt(getRandomInt(0, charSet.length - 1));
  }
  const complexity = calcComplexity(password.length, charSet.length);
  return { password, complexity };
};

const multyGenerator = (params, num) => {
  for (let i = 0; i <= num; i += 1) {
    console.log(generator(params));
  }
};

const testParams = {
  pwdLength: 20, useDigits: true, useLowerCase: true, useUpperCase: true, useSymbols: true,
};

multyGenerator(testParams, 10);

export default generator;
