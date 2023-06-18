import Router from 'express';
import passport from 'passport';

const router = new Router();

router.get('/login', async (req, res) => {
  try {
    res.render('login', { message: req.flash('error') });
  } catch (error) {
    res.status(500).send();
  }
});

router.post('/login', async (req, res, next) => {
  res.send(req.body);
  try {
    passport.authenticate('local', {
      successRedirect: '/dashboart',
      failureRedirect: '/login',
      badRequestMessage: 'The email does not exist',
      failureFlash: true,
    })(req, res, next);
  } catch (error) {
    res.status(400).send();
  }
});

export default router;
