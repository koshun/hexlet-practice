import { DataTypes } from 'sequelize';
import sequelize from '../../config/dbConfig.js';

const User = sequelize.define('user', {
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
