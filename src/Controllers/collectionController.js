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
  if (!collection) {
    request.flash('error', 'Колекция не может быть пустой');
    return response.redirect(`/dashboart/user/${request.id}/collections/add`);
  }
  const data = {
    name: collection,
  };
  try {
    const newCollection = await Collection.create(data);
    console.log(newCollection);
    return response.redirect(`/dashboart/user/${request.user.id}/collections/add`);
  } catch (e) {
    request.flash('error', 'That collection is already exist');
    console.error('Somethint', e.message);
    return response.redirect(`/dashboart/user/${request.user.id}/collections/add`);
  }
};
