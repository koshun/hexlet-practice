import { string } from 'yup';
import { validate, removeErrors } from './validation.js';

const email = document.querySelector('.login__input-email');
const password = document.querySelector('.login__input-password');

const emailSchema = string()
  .email({ field: 'email', message: 'Incorrect email' })
  .required({ field: 'email', message: 'Email is required' });
const passwordSchema = string()
  .min(8, { field: 'password', message: 'Password too short' })
  .matches(/\d+/, { message: { field: 'password', message: 'Password no number' } })
  .matches(/[a-z]+/, { message: { field: 'password', message: 'Password no lowercase' } })
  .matches(/[A-Z]+/, { message: { field: 'password', message: 'Password no uppercase' } })
  .test(
    'Password has spaces',
    { field: 'password', message: 'Password has spaces' },
    (value) => !/\s+/.test(value),
  );

email.onblur = () => validate(emailSchema, email.value);
password.onblur = () => validate(passwordSchema, password.value);
email.onfocus = () => removeErrors('email');
password.onfocus = () => removeErrors('password');
