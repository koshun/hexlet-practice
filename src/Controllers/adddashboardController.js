import Accaunt from '../Models/accaunt.model.js';

export default (req, res) => {
  const {
    username,
    url,
    sitename,
    sitepassword,
  } = req.body;
  const userId = req.params.id;
  const data = {
    userId,
    username,
    svcPassword: sitepassword,
    description: sitename,
    svcLink: url,
  };
  Accaunt.create(data)
    .then(() => res.redirect(`/dashboart/user/${userId}/add`))
    .catch((e) => console.error(e));
};
