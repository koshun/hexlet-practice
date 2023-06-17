const digits = '0123456789';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const symbols = '!@#$%^&*_-+=`|\\(){}[]:;"\'<>,.?/';

const getRandomInt = (min, max) => Math.floor(min + Math.random() * (max - min + 1));

const calcComplexity = (pwdLen, charsLen) => Math.round(Math.log2(charsLen ** pwdLen), 2);

const deleteCharFromChars = (items, index) => {
  const item = items[index];
  const tempSet = new Set(...[items.split('')]);
  tempSet.delete(item);
  return [...tempSet].join('');
};

const generator = (params) => {
  let password = '';
  let chars = '';
  const length = params.pwdLength;
  if (params.useDigits) {
    chars += digits;
  }
  if (params.useLowerCase) {
    chars += lowercase;
  }
  if (params.useUpperCase) {
    chars += uppercase;
  }
  if (params.useSymbols) {
    chars += symbols;
  }
  let tempChars = chars;
  for (let i = 0; i < length; i += 1) {
    if (tempChars.length === 0) {
      tempChars = chars;
    }
    const randomIndex = getRandomInt(0, tempChars.length - 1);
    password += tempChars.charAt(randomIndex);
    tempChars = deleteCharFromChars(tempChars, randomIndex);
  }
  const complexity = calcComplexity(password.length, chars.length);
  return { password, complexity };
};

// const multyGenerator = (params, num) => {
//   for (let i = 1; i <= num; i += 1) {
//     console.log(generator(params));
//   }
// };

// const testParams = {
//   pwdLength: 10, useDigits: true, useLowerCase: true, useUpperCase: true, useSymbols: false,
// };

// multyGenerator(testParams, 10);

export default generator;
