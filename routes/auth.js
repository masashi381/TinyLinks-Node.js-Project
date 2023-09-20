import express from 'express';

import { loginUser } from '../controllers/authLogin.js';
import { registeredNewUsers } from '../controllers/authControllers.js';
import { logout } from '../controllers/authLogout.js';
const authRouter = express.Router();

authRouter.use(express.json());
authRouter.use(express.urlencoded({ extended: true }));

// Show login page
authRouter.get('/login', (req, res) => {
  if (req.session.user) {
    res.redirect('/urls');
    res.render('urls', { name: req.session.name });
  }
  res.render('login', { name: '' });
});

// Show register page
authRouter.get('/register', (req, res) => {
  if (req.session.user) {
    res.redirect('/urls');
    res.render('urls', { name: req.session.name });
  }
  res.render('register', { name: '' });
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
