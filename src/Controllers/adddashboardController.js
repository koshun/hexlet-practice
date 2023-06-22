import Accaunt from '../Models/accaunt.model.js';
import Collection from '../Models/collection.model.js';

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
    svcPassword: sitepassword,
    description: sitename,
    svcLink: url,
    collectionId: collection,
  };
  Accaunt.create(data)
    .then(() => res.redirect(`/dashboart/user/${userId}/add`))
    .catch((e) => console.error(e));
};
