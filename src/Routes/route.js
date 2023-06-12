import loginController from '../Controllers/loginController.js';
import singupController from '../Controllers/signupController.js';
import userController from '../Controllers/userController.js';

export default (app) => {
  // userRouter.get('/login', loginController);
  // userRouter.get('signup', singupController);
  // app.use('/user', userRouter);
  app.route('/login')
    .get(loginController.index)
    .post(loginController.store);
  // app.get('/login', loginController.index);
  app.get('/signup', singupController);
  app.get('/', userController);
};
