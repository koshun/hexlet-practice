import sequelize from '../../config/dbConfig.js';
import User from '../Models/user.model.js';

export default (req, res) => {
  sequelize.sync().then(() => {
    User.create({
      login: 'superstar',
      email: 'email@mail.com',
      password: 'password',
    }).then((result) => {
      res.render('success', { pageTitle: 'Main page', title: `This is main page ${result.id}` });
      console.log(result.id);
    }).catch((error) => {
      console.error('Failed to create a new recor:', error);
    });
  }).catch((e) => {
    console.error('unable to create table', e);
  });
};
