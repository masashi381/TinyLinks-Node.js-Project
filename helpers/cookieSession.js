import session from 'express-session';
import express from 'express';

export const cookieSession = () => {
  const router = express.Router();

  return router.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 24 * 60 * 60 * 1000 },
    }),
  );
};
