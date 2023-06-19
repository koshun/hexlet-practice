import passport from 'passport';
import { body, checkSchema, validationResult } from 'express-validator';
import loginController from '../Controllers/loginController.js';
import { index, store } from '../Controllers/signupController.js';
import userController from '../Controllers/userController.js';
import logoutController from '../Controllers/logoutController.js';
import strategyPassport from '../../config/passport.js';
import authMiddleWare from '../MiddleWare/authMiddleWare.js';
import validate from '../validators/registrationValidator.js';

export default (app) => {
  strategyPassport(passport);
  app.route('/login')
    .get(loginController)
    .post(
      passport.authenticate('local', { failureRedirect: '/login' }),
      (req, res) => {
        res.redirect(`/dashboart/user/${req.user.id}`);
      },
    );
  app.get('/signup', index);
  app.post('/singup', validate([
    body('email').isEmail().normalizeEmail().withMessage('Email must be valid e-mail string'),
    body('password').isLength({ min: 6 }).withMessage('password min 6 signs'),
    body('login').notEmpty().isAlpha().withMessage('Login is required'),
  ], validationResult), store);
  app.get('/dashboart/user/:id', (req, res) => {
    res.send(`<h1>Hello dashboard ${req.params.id} ${req.user.login}</h1> <br> <a href="/">Main</a> <br> <a href="/logout">LogOut</a>`);
  });
  app.get('/', userController);
  app.get('/logout', logoutController);

  app.all('/dashboart', authMiddleWare);
  app.all('/dashboart/*', authMiddleWare);
  // 404 route
  // The 404 Route (ALWAYS Keep this as the last route)
  app.get('*', (req, res) => {
    res.send('Page not found. Error code 404', 404);
  });
};
