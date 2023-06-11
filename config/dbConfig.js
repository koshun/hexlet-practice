import { Sequelize } from 'sequelize';
import { join } from 'path';
import process from 'process';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: join(process.cwd(), '/config/database.sqlite'),
});
export default sequelize;
