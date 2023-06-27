import passport from 'passport';
import { validationResult } from 'express-validator';
import mainController from '../Controllers/mainController.js';
import { apiUserGet, apiUserUpdate } from '../Controllers/api.userController.js';
import {
  loginAction,
  logoutAction,
  indexSignUpAction,
  storeSignUpAction,
} from '../Controllers/userController.js';
import strategyPassport from '../../config/passport.js';
import authMiddleWare from '../MiddleWare/authMiddleWare.js';
import validate from '../validators/registrationValidator.js';
import {
  indexAction,
  showAction,
  storeAction,
  updateIndexAction,
  updateStoreAction,
} from '../Controllers/dashboartController.js';
import { index as collectionIndex, store as collectionStore } from '../Controllers/collectionController.js';
import deleteAccountItem from '../Controllers/api.dashboardController.js';
import { index as indexCollection, deleteCollection, updateCollection } from '../Controllers/api.collectionController.js';
import signupValidator from '../validators/signupValidator.js';

export default (app) => {
  strategyPassport(passport);
  app.route('/login')
    .get(loginAction)
    .post(
      passport.authenticate('local', { failureRedirect: '/login' }),
      (req, res) => {
        res.redirect(`/dashboart/user/${req.user.id}`);
      },
    );
  app.get('/signup', indexSignUpAction);
  app.post('/singup', validate(signupValidator, validationResult), storeSignUpAction);
  app.get('/', mainController);

  // delete account item
  app.use('/dashboart/*', authMiddleWare);
  app.delete('/api/dashboart/accaunt/delete/:id', deleteAccountItem);
  app.route('/dashboart/user/:userId/update/:id')
    .get(updateIndexAction)
    .post(updateStoreAction);
  app.get('/dashboart/user/:id', indexAction);
  // api for user data
  app.route('/api/dashboart/user/:id')
    .get(apiUserGet)
    .put(apiUserUpdate);

  app.get('/logout', logoutAction);

  app.route('/dashboart/user/:id/add')
    .get(showAction)
    .post(storeAction);

  // collections url
  app.get('/api/dashboart/collections', indexCollection);
  app.delete('/api/dashboart/collections/:id/delete', deleteCollection);
  app.put('/api/dashboart/collections/:id/update', updateCollection);
  app.get('/dashboart/user/:id/collections/add', collectionIndex);
  app.post('/dashboart/user/:id/collections/add', collectionStore);

  // The 404 Route (ALWAYS Keep this as the last route)
  app.get('*', (req, res) => {
    res.status(404).send('Page not found. Error code 404');
  });
};
