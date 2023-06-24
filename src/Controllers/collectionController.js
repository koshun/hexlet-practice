import Collection from '../Models/collection.model.js';

export const index = (request, response) => {
  response.render('collection_add', {
    layout: 'dashboart',
    pageTitle: 'Add new Collection',
    user: request.user,
    error: request.flash('error'),
  });
};

export const store = async (request, response) => {
  const { collection } = request.body;
  const data = {
    name: collection,
  };
  try {
    const newCollection = await Collection.create(data);
    console.log(newCollection);
    response.redirect(`/dashboart/user/${request.user.id}`);
  } catch (e) {
    request.flash('error', 'That collection is already exist');
    response.redirect(`/dashboart/user/${request.user.id}/collections/add`);
    console.error('Somethint', e.message);
  }
};
