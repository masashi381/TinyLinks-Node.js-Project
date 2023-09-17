import express from 'express';
import session from 'express-session';

import { loginUser } from '../controllers/authLogin.js';
import { registeredNewUsers } from '../controllers/authControllers.js';
const authRouter = express.Router();

// Session configuration
authRouter.use(
  session({
    secret: 'secret', // Replace with a strong secret, preferably from an environment variable
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  }),
);

authRouter.use(express.json());
authRouter.use(express.urlencoded({ extended: true }));

// Create a new user with a UUID (Replace this with database logic)

// Mock user data (Replace this with a database)

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  console.log('user', req.session.user);
  if (req.session.user) {
    next();
  } else {
    res.redirect('/auth/login');
    // next();
  }
};

// Show login page
authRouter.get('/login', isAuthenticated, (req, res) => {
  // res.send(`hello ${req.session.user}`);
  res.render('login');
});

// Handle login
authRouter.post('/login', (req, res) => {
  loginUser(req, res);
});

// Show register page
authRouter.get('/register', (req, res) => {
  // res.send('Register Page');
  res.render('register');
});

// Handle registration
authRouter.post('/register', (req, res) => {
  registeredNewUsers(req, res);
});

// Logout
authRouter.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/login');
  });
});

export default authRouter;
