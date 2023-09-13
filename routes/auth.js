import express from 'express';
const authRouter = express.Router();

//show my login page
authRouter.get('/', (req, res) => {
  res.send('login');
});

export default authRouter;
