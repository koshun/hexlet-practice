export default (app) => {
  app.get('/login', (req, res) => {
    res.send('<h1>Login</h1>');
  });

  app.get('/signup', (req, res) => {
    res.send('this is send message register page');
  });
};
