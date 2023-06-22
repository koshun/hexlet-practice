import { string } from 'yup';
import { validate, removeErrors } from './validation.js';

const login = document.querySelector('.registration__input-login');
const email = document.querySelector('.registration__input-email');
const password = document.querySelector('.registration__input-password');

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
