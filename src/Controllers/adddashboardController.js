import { Op } from 'sequelize';
import Accaunt from '../Models/accaunt.model.js';
import Collection from '../Models/collection.model.js';
import { encrypt, decrypt } from '../Hellpers/cipherHelper.js';

export const index = async (req, res) => {
  const collections = await Collection.findAll({
    attributes: ['id', 'name'],
  });
  res.render('dashboard_add', {
    pageTitle: 'Add site info',
    user: req.user,
    layout: 'dashboart',
    collections,
  });
};

export const store = (req, res) => {
  const {
    username,
    url,
    sitename,
    sitepassword,
    collection,
  } = req.body;
  const userId = req.params.id;
  const data = {
    userId,
    username,
    svcPassword: encrypt(sitepassword),
    description: sitename,
    svcLink: url,
    collectionId: collection,
  };
  Accaunt.create(data)
    .then(() => res.redirect(`/dashboart/user/${userId}`))
    .catch((e) => console.error(e));
};

export const updateIndex = async (req, res) => {
  const { id, userId } = req.params;
  const accaunt = await Accaunt.findOne({
    where: {
      [Op.and]: [
        { id },
        { userId },
      ],
    },
    include: Collection,
  });
  const { dataValues } = accaunt;
  const decryptPassword = decrypt(dataValues.svcPassword);
  const accauntValues = { ...dataValues, svcPassword: decryptPassword };
  const collections = await Collection.findAll();
  // res.json(accaunt);
  res.render('dashboard_update', {
    pageTitle: 'Update site info',
    user: req.user,
    layout: 'dashboart',
    accaunt: accauntValues,
    collections,
  });
};

export const updateStore = async (req, res) => {
  const { id, userId } = req.params;
  const {
    username,
    url,
    sitename,
    sitepassword,
    collection,
  } = req.body;

  const data = {
    username,
    svcPassword: encrypt(sitepassword),
    description: sitename,
    svcLink: url,
    collectionId: collection, // ???
  };
  try {
    await Accaunt.update(data, {
      where: {
        [Op.and]: [
          { id },
          { userId },
        ],
      },
    });
    req.flash('success', 'данные обновлены');
    res.redirect(`/dashboart/user/${userId}`);
  } catch (e) {
    req.flash('error', 'Не могу обновить данные');
  }
};
