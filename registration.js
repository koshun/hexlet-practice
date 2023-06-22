import { string } from 'yup';
import { validate, removeErrors } from './validation.js';

const login = document.querySelector('.registration__input-login');
const email = document.querySelector('.registration__input-email');
const password = document.querySelector('.registration__input-password');

const loginSchema = string()
  .min(8, { field: 'login', message: 'Login too short' });
  // .required({ field: 'login', message: 'Login is required' });
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

login.onblur = () => validate(loginSchema, login.value);
email.onblur = () => validate(emailSchema, email.value);
password.onblur = () => validate(passwordSchema, password.value);
login.onfocus = () => removeErrors('login');
email.onfocus = () => removeErrors('email');
password.onfocus = () => removeErrors('password');
