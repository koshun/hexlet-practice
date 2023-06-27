import Strategy from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../src/Models/user.model.js';

export default (passport) => {
  passport.use(
    new Strategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return done(null, false, { message: 'That email is not required' });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return done(user.errors, null, { message: 'Email or password incorrect' });
      }
      return done(null, user);
    }),
  );
  passport.serializeUser((user, cb) => {
    process.nextTick(() => cb(null, {
      id: user.id,
      login: user.login,
    }));
  });
  passport.deserializeUser((user, cb) => {
    process.nextTick(() => cb(null, user));
  });
};
