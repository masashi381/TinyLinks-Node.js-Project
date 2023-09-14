import express from 'express';
const authRouter = express.Router();
import authJson from '../models/users.json' assert { type: 'json' };
import { v4 as uuidv4 } from 'uuid';
//show my login page
authRouter.get('/', (req, res) => {
  res.send('Welcome');
});

//show login page
authRouter.get('/login', (req, res) => {
  res.render('login');
});

// show register page
authRouter.get('/register', (req, res) => {
  res.render('register');
});

authRouter.post('/register', (req, res) => {
  console.log(req.body);
  res.send('form works');
});

const test = uuidv4();
console.log('test:', test);
export default authRouter;
