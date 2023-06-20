import { QueryTypes } from 'sequelize';
import sequelize from '../../config/dbConfig.js';

const index = (req, res) => {
  sequelize.query(
    'SELECT * FROM passwords JOIN collections ON passwords.collectionid=collections.id WHERE passwords.userid=1',
    {
      replacements: [req.params.id],
      type: QueryTypes.SELECT,
    },
  ).then((data) => res.render('dashboard', {
    data,
    pageTitle: 'Dashboard',
    title: 'Dashboard',
    user: req.user,
    layout: 'dashboart',
  })).catch((e) => console.error(e));
};

export default index;
