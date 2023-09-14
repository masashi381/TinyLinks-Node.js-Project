import express from 'express';

import authJson from '../models/users.json' assert { type: 'json' };
const authRouter = express.Router();
authRouter.use(express.json());
import { registerUser } from '../controllers/auth.js';

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

// show register page
authRouter.get('/register', (req, res) => {
  console.log('results:', authJson);
  res.render('register');
});

authRouter.post('/register', (req, res) => {
  // res.send('form works');
  registerUser(req, res);
});

export default authRouter;
