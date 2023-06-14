import password from './src/generator.js';

const slider = document.querySelector('.password-length__range');
const lengthField = document.querySelector('.password-length__output');

const checkboxes = document.querySelectorAll('.checkbox');
const params = {
  pwdLength: 6
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

const input = document.querySelector('.output-form__password');
const btn = document.querySelector('.generate-password__button');
const result = () => {
  input.setAttribute('value', pwdGen());
};
btn.addEventListener('click', result);
