import express from 'express';
import session from 'express-session';

import { loginUser } from '../controllers/authLogin.js';
import { registeredNewUsers } from '../controllers/authControllers.js';
import { logout } from '../controllers/authLogout.js';
const authRouter = express.Router();

// Session configuration
authRouter.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  }),
);

authRouter.use(express.json());
authRouter.use(express.urlencoded({ extended: true }));

authRouter.get('/login', (req, res) => {
  console.log('get login', req.session.user);
  if (req.session.user) {
    res.redirect('/urls');
    res.render('urls', { name: req.session.user }); //追加
  }
  // console.log('test');
  res.render('login', { name: '' }); //追加
});

// Show register page
authRouter.get('/register', (req, res) => {
  console.log('register', req.session.user);
  if (req.session.user) {
    res.redirect('/urls');
    res.render('urls', { name: req.session.user }); //追加
  }
  res.render('register', { name: '' }); //追加
});

// Handle login
authRouter.post('/login', (req, res) => {
  loginUser(req, res);
});

// Handle registration
authRouter.post('/register', (req, res) => {
  registeredNewUsers(req, res);
});

// Logout
authRouter.post('/logout', (req, res) => {
  logout(req, res);
});

export default authRouter;
