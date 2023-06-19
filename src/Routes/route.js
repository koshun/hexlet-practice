import passport from 'passport';
import loginController from '../Controllers/loginController.js';
import { index, store } from '../Controllers/signupController.js';
import userController from '../Controllers/userController.js';
import logoutController from '../Controllers/logoutController.js';
import strategyPassport from '../../config/passport.js';

export default (app) => {
  strategyPassport(passport);
  app.get('/login', loginController);
  app.post(
    '/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect(`/dashboart/user/${req.user.id}`);
    },
  );
  app.get('/signup', index);
  app.post('/singup', store);
  app.get('/dashboart/user/:id', (req, res) => {
    res.send(`<h1>Hello dashboard ${req.params.id} ${req.user.login}</h1> <br> <a href="/">Main</a> <br> <a href="/logout">LogOut</a>`);
  });
  app.get('/', userController);
  app.get('/logout', logoutController);
};
