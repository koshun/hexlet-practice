import loginController from '../Controllers/loginController.js';
import singupController from '../Controllers/signupController.js';
import userController from '../Controllers/userController.js';

export default (app) => {
  // userRouter.get('/login', loginController);
  // userRouter.get('signup', singupController);
  // app.use('/user', userRouter);

  app.get('/login', loginController);
  app.get('/signup', singupController);
  app.get('/', userController);
};
