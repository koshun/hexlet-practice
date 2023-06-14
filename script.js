import password from './src/generator.js';
alert('hello')

const slider = document.querySelector('.password-length__range');
const lengthField = document.querySelector('.password-length__output');
let pwdLength;
slider.addEventListener('change', (event) => {
  pwdLength = event.target.value;
  lengthField.setAttribute('placeholder', pwdLength);
});
let useDigits;
document.querySelector('.checkbox-group__include-numbers-input')
  .addEventListener('change', (event) => useDigits = event.target.checked);

let useLowerCase;
document.querySelector('.checkbox-group__include-chars-input-lower')
  .addEventListener('change', (event) => useLowerCase = event.target.checked);

let useUpperCase;

document.querySelector('.checkbox-group__include-chars-input-upper')
  .addEventListener('change', (event) => useUpperCase = event.target.checked);

let useSymbols;
document.querySelector('.checkbox-group__include-symbols-input')
  .addEventListener('change', (event) => useSymbols = event.target.checked);

const func = () => {
  const pwd = password({
    pwdLength, useDigits, useLowerCase, useUpperCase, useSymbols,
  });
  return pwd.password;
};
const input = document.querySelector('.output-form__password');
const btn = document.querySelector('.generate-password__button');
const result = () => {
  input.setAttribute('value', func());
};
btn.addEventListener('click', result);
