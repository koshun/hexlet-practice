import Collection from '../Models/collection.model.js';

export const index = (request, response) => {
  response.render('collection_add', {
    layout: 'dashboart',
    pageTitle: 'Add new Collection',
    user: request.user,
  });
};

export const store = async (request, response) => {
  const { collection } = request.body;
  const data = {
    name: collection,
  };
  const newCollection = await Collection.create(data);
  if (newCollection) {
    response.redirect('/');
  } else {
    response.redirect(`/dashboart/user/${request.user.id}/collections/add`);
    console.error('Somethint');
  }
};
