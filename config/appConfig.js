import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';
import handlebars from 'express-handlebars';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import passport from 'passport';

export default () => {
  // const sessionStore = new session.MemoryStore();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const app = express();
  // Template
  app.engine('hbs', handlebars.engine({
    layoutsDir: join(__dirname, '/../src/Views/layouts'),
    defaultLayout: 'layout',
    extname: 'hbs',
    partialsDir: join(__dirname, '/../src/Views/partials/'),
  }));
  app.set('views', join(__dirname, '/../src/Views')); // './src/Views'
  app.set('view engine', 'hbs');
  // decode url
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  // static folder
  app.use(express.static(join(__dirname, '/../public')));
  // cookie and session
  app.use(cookieParser('theremustBeASecret'));
  app.use(session({
    secret: 'theremustBeASecret',
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 60000 },
  }));
  app.use(passport.session());
  app.use(flash());
  // passport
  app.use(passport.initialize());
  return app;
};
