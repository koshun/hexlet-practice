import { body } from 'express-validator';

export default [
  body('email').isEmail().normalizeEmail().withMessage('Email must be valid e-mail string'),
  body('password').isLength({ min: 6 }).withMessage('password min 6 signs'),
  body('login').notEmpty().isAlpha().withMessage('Login is required'),
];
