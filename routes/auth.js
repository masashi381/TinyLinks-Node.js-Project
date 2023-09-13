import express from 'express';
const authRouter = express.Router();
import authJson from '../models/users.json' assert { type: 'json' };

console.log(authJson);
//show my login page
authRouter.get('/', (req, res) => {
  res.send('login');
});

//show login page
authRouter.get('/login', (req, res) => {
  res.send(authJson);
});

// show register page
authRouter.get('/register', (req, res) => {
  res.send('register');
});

export default authRouter;
