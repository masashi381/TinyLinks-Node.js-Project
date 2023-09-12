import express from 'express';
const urlRouter = express.Router();

urlRouter.get('/', (req, res) => {
  res.render('urls');
});

urlRouter.post('/', (req, res) => {
  console.log('post');
});

urlRouter.get('/new', (req, res) => {
  res.render('newUrl');
});

urlRouter.get('/:id', (req, res) => {
  res.render('singleUrl');
});

//??
urlRouter.get('/u/:id', (req, res) => {});

urlRouter.put('/:id', (req, res) => {
  console.log('edited');
});

urlRouter.get('/:id/delete', (req, res) => {
  console.log('deleted');
});

export default urlRouter;
