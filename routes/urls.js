import express from 'express';
import { createUrl } from '../controllers/urls.js';
const urlRouter = express.Router();

//show my URLs page
urlRouter.get('/', (req, res) => {
  res.render('urls');
});

//show create new URL page
urlRouter.get('/new', (req, res) => {
  res.render('newUrl');
});

//submit new URL
urlRouter.post('/', (req, res) => {
  createUrl(req, res);
});

//show single URL page
urlRouter.get('/:id', (req, res) => {
  res.render('singleUrl');
});

//??
urlRouter.get('/u/:id', (req, res) => {});

// PUTとDELETEのmethodがhtmlに存在しないため、
// GETとPOSTで書き換えが必要

//edit URL
urlRouter.post('/:id', (req, res) => {
  console.log('edited');
});

//delete URL
urlRouter.delete('/:id/delete', (req, res) => {
  console.log('deleted');
});

export default urlRouter;
