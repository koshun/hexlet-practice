// import { QueryTypes } from 'sequelize';
// import sequelize from '../../config/dbConfig.js';
import Accaunt from '../Models/accaunt.model.js';
import User from '../Models/user.model.js';
import Collection from '../Models/collection.model.js';

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

const index = async (req, res) => {
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

export default index;
