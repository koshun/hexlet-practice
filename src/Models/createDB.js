import sequelize from '../../config/dbConfig.js';
import User from './user.model.js';
import Password from './password.model.js';
import Collection from './collection.model.js';

User.hasMany(Password, {
  foreignKey: 'userId',
});
Password.belongsTo(User);
Collection.hasMany(Password, {
  foreignKey: 'collectionId',
});

Password.belongsTo(Collection);

sequelize.sync({ alter: true });
