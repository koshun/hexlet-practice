export default (req, res) => {
  res.render('login', {
    pageTitle: 'Вход',
    title: 'This is a login page',
    layout: 'login',
    success: req.flash('success'),
    errors: req.flash('errors'),
  });
};
