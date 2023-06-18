import { Sequelize } from 'sequelize';
import { createNamespace } from 'cls-hooked';
import { join } from 'path';
import process from 'process';

const namespace = createNamespace('ns');
Sequelize.useCLS(namespace);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: join(process.cwd(), '/config/database.sqlite'),
});
export default sequelize;
