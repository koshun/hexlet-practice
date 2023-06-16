import route from './src/Routes/route.js';
import config from './config/appConfig.js';
import sequelize from './config/dbConfig.js';

const port = process.env.PORT || 3001;

const app = config();

route(app);
sequelize.sync().then(() => {
  app.listen(port, () => console.log(`server work on port ${port}`));
}).catch((e) => {
  console.error('unable to create table', e);
});
