export default {
  index: (req, res) => res.render('login', { pageTitle: 'Login page', title: 'This is login page' }),
  store: (req, res) => res.redirect('/'),
};
