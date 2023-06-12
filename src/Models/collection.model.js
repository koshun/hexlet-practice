import { DataTypes } from 'sequelize';
import sequelize from '../../config/dbConfig.js';

const Collection = sequelize.define('collection', {
  name: {
    type: DataTypes.String,
    allowNull: false,
    unique: true,
  },
});

export default Collection;
