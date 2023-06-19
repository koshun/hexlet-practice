export default (req, res) => {
  res.render('main', { pageTitle: 'Создайте свой уникальный пароль', user: req.user });
};
