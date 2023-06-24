import route from './src/Routes/route.js';
import config from './config/appConfig.js';
import sequelize from './config/dbConfig.js';
// import authRouter from './src/Routes/auth.js';
// import indexRouter from './src/Routes/index.js';

const port = process.env.PORT || 3001;

const app = config();
// app.use('/', indexRouter);
// app.use('/', authRouter);
route(app);
sequelize.sync().then(() => {
  app.listen(port, () => console.log(`server work on port ${port}`));
}).catch((e) => {
  console.error('unable to create table', e);
});
