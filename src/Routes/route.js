import passport from 'passport';
import loginController from '../Controllers/loginController.js';
import { index, store } from '../Controllers/signupController.js';
import userController from '../Controllers/userController.js';
import strategyPassport from '../../config/passport.js';

export default (app) => {
  // userRouter.get('/login', loginController);
  // userRouter.get('signup', singupController);
  // app.use('/user', userRouter);
  strategyPassport(passport);
  app.get('/login', loginController);
  app.post('/login', async (req, res, next) => {
    try {
      passport.authenticate('local', {
        successRedirect: '/dashboart',
        failureRedirect: '/login',
        badRequestMessage: 'The email does not exist',
        failureFlash: true,
      })(req, res, next);
    } catch (error) {
      res.status(400).send();
    }
  });
  app.get('/signup', index);
  app.post('/singup', store);
  app.get('/dashboart', (req, res) => {
    res.send(`<h1>Hello dashboard ${JSON.stringify(req.user)}</h1>`);
  });
  app.get('/', userController);
};
