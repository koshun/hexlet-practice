import { DataTypes } from 'sequelize';
import sequelize from '../../config/dbConfig.js';

const Password = sequelize.define('password', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  collectionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  svcPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  svcLink: {
    type: DataTypes.STRING,
  },
});

export default Password;
