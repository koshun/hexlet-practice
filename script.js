import password from './src/generator.js';
import checkComplexity from './src/testComplexity.js';

const slider = document.querySelector('.password-length__range');
const lengthField = document.querySelector('.password-length__output');

const checkboxes = document.querySelectorAll('.checkbox');
const params = {
  pwdLength: 10,
};
slider.addEventListener('input', (event) => {
  params.pwdLength = event.target.value;
  lengthField.setAttribute('placeholder', params.pwdLength);
});

const pwdGen = () => {
  checkboxes.forEach((node) => {
    const classes = node.classList;
    if (classes.contains('checkbox-group__include-numbers-input')) {
      params.useDigits = node.checked;
    }
    if (classes.contains('checkbox-group__include-symbols-input')) {
      params.useSymbols = node.checked;
    }
    if (classes.contains('checkbox-group__include-chars-input-upper')) {
      params.useUpperCase = node.checked;
    }
    if (classes.contains('checkbox-group__include-chars-input-lower')) {
      params.useLowerCase = node.checked;
    }
  });
  const pwd = password(params);
  return pwd.password;
};

const btnCopy = document.querySelector('.copy-password__button');
const input = document.querySelector('.output-form__password');
const btn = document.querySelector('.generate-password__button');
const btnRepeat = document.querySelector('.repeat__button');
const complDiv = document.querySelector('.password-check');
const complSpan = document.querySelector('.password-check > span');
const removeClasses = (el, prefix) => el.className.split(' ').filter((cl) => !cl.startsWith(prefix)).join(' ');
const changeComplexity = () => {
  const complexity = checkComplexity(input.value);
  // console.log(complexity);
  complDiv.className = removeClasses(complDiv, 'password-check_');
  complSpan.className = removeClasses(complSpan, 'password-check-text');
  if (complexity < 52) {
    complDiv.classList.add('password-check_bad');
    complSpan.classList.add('password-check-text_bad');
    complSpan.innerHTML = 'Плохой';
  }
  if (complexity >= 52 && complexity < 105) {
    complDiv.classList.add('password-check_good');
    complSpan.classList.add('password-check-text_good');
    complSpan.innerHTML = 'Хороший';
  }
  if (complexity > 105) {
    complDiv.classList.add('password-check_protected');
    complSpan.classList.add('password-check-text_protected');
    complSpan.innerHTML = 'Надежный';
  }
};
const result = () => {
  input.setAttribute('value', pwdGen());
  changeComplexity();
};
result();
btn.addEventListener('click', result);
btnRepeat.addEventListener('click', result);
input.addEventListener('input', changeComplexity);

const copyPassword = () => {
  input.select();
  document.execCommand('copy');
};
btnCopy.addEventListener('click', copyPassword);
