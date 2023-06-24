import { string } from 'yup';
import { validate } from './validation.js';

const login = document.querySelector('.form__login');
const email = document.querySelector('.form__email');
const password = document.querySelector('.form__password');

const loginSchema = string()
  .min(8, { field: 'login', message: 'Login должен быть не менее 8 символов' });
  // .required({ field: 'login', message: 'Login is required' });
const emailSchema = string()
  .email({ field: 'email', message: 'Некорректный email' })
  .required({ field: 'email', message: 'Email обязательное поле' });
const passwordSchema = string()
  .min(8, { field: 'password', message: 'Пароль должен быть не менее 8 символов' })
  .required({ field: 'password', message: 'Пароль обязательное поле' })
  .matches(/\d+/, { message: { field: 'password', message: 'Пароль должен содержать цифры' } })
  .matches(/[a-z]+/, { message: { field: 'password', message: 'Пароль должен содержать маленькие буквы' } })
  .matches(/[A-Z]+/, { message: { field: 'password', message: 'Пароль должен содержать большие буквы' } })
  .test(
    'Password has russian letters',
    { field: 'password', message: 'Пароль содержит русские буквы' },
    (value) => !/[а-яё]|[А-ЯЁ]/.test(value),
  )
  .test(
    'Password has spaces',
    { field: 'password', message: 'Пароль содержит пробел' },
    (value) => !/\s+/.test(value),
  );

login.oninput = () => validate(loginSchema, login);
email.oninput = () => validate(emailSchema, email);
password.oninput = () => validate(passwordSchema, password);
