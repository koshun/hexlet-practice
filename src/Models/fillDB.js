import sequelize from '../../config/dbConfig.js';
// import User from './user.model.js';
import Password from './password.model.js';
// import Collection from './collection.model.js';
import generator from '../Hellpers/generatorHelper.js';

// const names = [
//   'Anastasia',
//   'Viktor',
//   'Denis',
//   'Konstantin',
//   'Maxim',
//   'Sergey',
// ];

// const collections = [
//   'Search Engine',
//   'Social Net',
//   'Video hosting',
//   'Programming',
//   'Internet store',
//   'Encyclopedia',
// ];
const services = [
  {
    name: 'Google',
    url: 'https://www.google.com/',
    collection: 'Search Engine',
    id: 1,
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/',
    collection: 'Social Net',
    id: 2,
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/',
    collection: 'Video hosting',
    id: 3,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/',
    collection: 'Social Net',
    id: 2,
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/',
    collection: 'Social Net',
    id: 2,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/',
    collection: 'Social Net',
    id: 2,
  },
  {
    name: 'GitHub',
    url: 'https://github.com/',
    collection: 'Programming',
    id: 4,
  },
  {
    name: 'Amazon',
    url: 'https://www.amazon.com/',
    collection: 'Internet store',
    id: 5,
  },
  {
    name: 'Wikipedia',
    url: 'https://ru.wikipedia.org',
    collection: 'Encyclopedia',
    id: 6,
  },
  {
    name: 'Yandex',
    url: 'https://yandex.ru/',
    collection: 'Search Engine',
    id: 1,
  },
];
const pwdParams = {
  pwdLength: 10,
  useDigits: true,
  useLowerCase: true,
  useUpperCase: true,
  useSymbols: false,
};
sequelize.sync();

sequelize.authenticate();
console.log('database connected');
// collections.forEach((c) => {
//   Collection.create({ name: c });
// });
// names.forEach((u) => {
//   User.create({
//     login: u,
//     email: `${u}@example.com`,
//     password: `${u}_pwd`,
//   });
// });

const users = await sequelize.query('select * from users');
// console.info(users[0])
users[0].forEach((user) => {
  services.forEach((c) => {
    Password.create({
      userId: user.id,
      collectionId: c.id,
      svcPassword: generator(pwdParams).password,
      description: c.name,
      svcLink: c.url,
    });
  });
});
