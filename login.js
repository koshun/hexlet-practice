import { string } from 'yup';
import { validate, removeErrors } from './validation.js';

const email = document.querySelector('.login__input-email');
const password = document.querySelector('.login__input-password');

const emailSchema = string()
  .email({ field: 'email', message: 'Некорректный email' })
  .required({ field: 'email', message: 'Email обязательное поле' });
const passwordSchema = string()
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

email.onblur = () => validate(emailSchema, email);
password.onblur = () => validate(passwordSchema, password);
email.onfocus = () => removeErrors(email);
password.onfocus = () => removeErrors(password);
