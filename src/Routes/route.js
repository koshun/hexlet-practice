import passport from 'passport';
import { body, validationResult } from 'express-validator';
import loginController from '../Controllers/loginController.js';
import { index, store } from '../Controllers/signupController.js';
import userController from '../Controllers/userController.js';
import { apiUserGet, apiUserUpdate } from '../Controllers/api.userController.js';
import logoutController from '../Controllers/logoutController.js';
import strategyPassport from '../../config/passport.js';
// import authMiddleWare from '../MiddleWare/authMiddleWare.js';
import validate from '../validators/registrationValidator.js';
import dashboartController from '../Controllers/dashboartController.js';
import { index as dashboardIndex, store as dashboardStore } from '../Controllers/adddashboardController.js';
import { index as collectionIndex, store as collectionStore } from '../Controllers/collectionController.js';

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
  app.get('/', userController);
  app.get('/dashboart/user/:id', dashboartController);
  // api for user data
  app.route('/api/dashboart/user/:id')
    .get(apiUserGet)
    .put(apiUserUpdate);
  app.get('/logout', logoutController);
  app.route('/dashboart/user/:id/add')
    .get(dashboardIndex)
    .post(dashboardStore);
  app.route('/dashboart/user/:id/collections/add')
    .get(collectionIndex)
    .post(collectionStore);
  // The 404 Route (ALWAYS Keep this as the last route)
  app.get('*', (req, res) => {
    res.status(404).send('Page not found. Error code 404');
  });
};
