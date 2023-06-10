import loginController from '../Controllers/loginController.js';

export default (app) => {
  app.get('/login', loginController);

  app.get('/signup', (req, res) => {
    res.send('this is send message register page');
  });
  app.get('/', (req, res) => {
    res.send('i\'m main page');
  });
};
