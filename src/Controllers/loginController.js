export default (req, res) => {
  res.render('login', {
    pageTitle: 'Вход', title: 'This is a login page', layout: 'login', message: req.flash('message'),
  });
};
