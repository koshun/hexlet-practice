import bcryp from 'bcryptjs';
import User from '../Models/user.model.js';

export const logoutAction = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.redirect('/');
  });
};

export const loginAction = (req, res) => {
  res.render('login', {
    pageTitle: 'Вход',
    title: 'This is a login page',
    layout: 'login',
    success: req.flash('success'),
    errors: req.flash('errors'),
  });
};

export const indexSignUpAction = (req, res) => {
  res.render('registration', {
    pageTitle: 'Регистрация',
    layout: 'login',
    error: req.flash('error'),
    errors: req.flash('errors'),
  });
};
export const storeSignUpAction = async (req, res) => {
  const { login, email, password } = req.body;
  const findEmail = await User.findOne({ where: { email } });
  const findLogin = await User.findOne({ where: { login } });
  if (findEmail || findLogin) {
    req.flash('error', 'Email or login must be unique');
    res.redirect('/signup');
  } else {
    const salt = bcryp.genSaltSync(8);
    const hashPassword = bcryp.hashSync(password, salt);
    const data = {
      login,
      email,
      password: hashPassword,
    };
    const newUser = await User.create(data);
    if (newUser) {
      req.flash('success', 'You are now register and you can log in');
      res.redirect('/login');
    } else {
      req.flash('error', 'something wrong, try again later');
      res.redirect('/signup');
    }
  }
};
