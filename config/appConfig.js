import express from 'express';
import handlebars from 'express-handlebars';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

export default () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({ secret: 'secret key', resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.engine('hbs', handlebars.engine({
    layoutsDir: join(__dirname, '/../src/Views/layouts'),
    defaultLayout: 'layout',
    extname: 'hbs',
    partialsDir: join(__dirname, '/../src/Views/partials/'),
  }));
  app.set('views', join(__dirname, '/../src/Views')); // './src/Views'
  app.set('view engine', 'hbs');
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(join(__dirname, '/../public')));
  return app;
};
