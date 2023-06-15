import onChange from 'on-change';
import generator from './src/generator.js';

const state = {
  range: {
    value: 0,
  },
  selections: {
    useLowerCase: false,
    useUpperCase: false,
    useDigits: false,
    useSymbols: false,
  },
};

const range = document.querySelector('.password-length__range');
const passwordLengthOutput = document.querySelector('.password-length__output');
const output = document.querySelector('.output-form__password');
const generatePasswordButton = document.querySelector('.generate-password__button');

passwordLengthOutput.value = range.value;

const renderLength = (path, value) => {
  passwordLengthOutput.value = value;
};

const watchedStateLength = onChange(state, renderLength);

range.addEventListener('input', (e) => {
  watchedStateLength.range.value = e.target.value;
});

const selectionFielsd = document.querySelectorAll('[type="checkbox"]');

const watchState = onChange(state, (path, value) => console.log(value));

generatePasswordButton.addEventListener('click', () => {
  selectionFielsd.forEach((element) => {
    watchState.selections[element.name] = element.checked;
  });
  state.selections.pwdLength = range.value;
  const { password } = generator(state.selections);
  output.value = password;
});
