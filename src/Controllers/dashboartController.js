import { Op } from 'sequelize';
import Accaunt from '../Models/accaunt.model.js';
import User from '../Models/user.model.js';
import Collection from '../Models/collection.model.js';
import { encrypt, decrypt } from '../Hellpers/cipherHelper.js';

User.hasMany(Accaunt, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'userId',
});
Accaunt.belongsTo(User);
Collection.hasMany(Accaunt, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'collectionId',
});
Accaunt.belongsTo(Collection);

const indexAction = async (req, res) => {
  try {
    const accaunt = await Accaunt.findAll({
      where:
      { userId: req.params.id },
      include: Collection,
    });
    // console.log(JSON.stringify(accaunt, null, 2));
    if (accaunt) {
      res.render('dashboard', {
        data: accaunt,
        title: 'Dashboard',
        pageTitle: 'Dashboard',
        user: req.user,
        layout: 'dashboart',
      });
    } else {
      res.render('dashboard', {
        title: 'Dashboard',
        pageTitle: 'Dashboard',
        user: req.user,
        layout: 'dashboart',
      });
    }
  } catch (e) {
    console.error(e);
  }
};

const showAction = async (req, res) => {
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

const storeAction = (req, res) => {
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

const updateIndexAction = async (req, res) => {
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
  res.render('dashboard_update', {
    pageTitle: 'Update site info',
    user: req.user,
    layout: 'dashboart',
    accaunt: accauntValues,
    collections,
  });
};

const updateStoreAction = async (req, res) => {
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

export {
  indexAction,
  showAction,
  storeAction,
  updateIndexAction,
  updateStoreAction,
};
