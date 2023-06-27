import bcrypt from 'bcryptjs';
import User from '../Models/user.model.js';

export const apiUserGet = async (req, res) => {
  const { id } = req.params;
  try {
    const userData = await User.findByPk(id, {
      attributes: ['login', 'email'],
    });
    res.json({ userData });
  } catch (e) {
    console.error('Не могу найти пользователя', e);
  }
};

export const apiUserUpdate = async (req, res) => {
  const {
    id,
    login,
    email,
    password,
  } = req.body;
  const ctrypPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  await User.update({ login, email, password: ctrypPassword }, {
    where: {
      id,
    },
  });
  res.json({ message: 'user data successfully updated' });
};
