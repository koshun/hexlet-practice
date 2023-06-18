import bcryp from 'bcryptjs';
import User from '../Models/user.model.js';

export const index = (req, res) => {
  res.render('registration', { pageTitle: 'Регистрация', layout: 'login' });
};
export const store = (req, res) => {
  const { login, email, password } = req.body;
  const salt = bcryp.genSaltSync(8);
  const hashPassword = bcryp.hashSync(password, salt);
  const data = {
    login,
    email,
    password: hashPassword,
  };
  User.create(data).then((newUser) => {
    if (newUser) {
      console.log(newUser);
      req.flash('success', 'You are now register and you can log in');
      res.redirect('/login');
    }
    req.flash('error', 'something wrong, try again later');
  }).catch((e) => {
    console.error('Bla, bla', e);
  });
};
