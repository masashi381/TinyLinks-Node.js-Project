import express from 'express';

import authJson from '../models/users.json' assert { type: 'json' };
const authRouter = express.Router();
authRouter.use(express.json());
import { registerUser } from '../controllers/auth.js';
import { loginUser } from '../controllers/authLogin.js';

// console.log('test:', uuid);

//show my login page
authRouter.get('/', (req, res) => {
  // res.send('Welcome');
  res.send(authJson);
});

//show login page
authRouter.get('/login', (req, res) => {
  res.render('login');
});

// make a POST request to /login
authRouter.post('/login', (req, res) => {
  loginUser(req, res);
  res.send('login successful');
});

// show register page
authRouter.get('/register', (req, res) => {
  console.log('results:', authJson);
  res.render('register');
});

// make a POST request to /register
authRouter.post('/register', (req, res) => {
  // res.send('form works');
  registerUser(req, res);
});

export default authRouter;
