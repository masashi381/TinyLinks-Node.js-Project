import express from 'express';
import { createUrl, updateUrl } from '../controllers/urls.js';
import cookieParser from 'cookie-parser';
import urlData from '../models/urls.json' assert { type: 'json' };
import { getUrls } from '../controllers/getUrls.js';
import { checkUrlExsistance } from '../controllers/checkUrlExsistance.js';
import { deleteUrl } from '../controllers/deleteUrl.js';

const urlRouter = express.Router();

urlRouter.use(cookieParser());

urlRouter.use((req, res, next) => {
  const userId = req.cookies.userId;
  //DO NOT DELETE ↓
  // if (!userId) {
  //   return res.send('you need to login first to see your URL list');
  // }
  // console.log(userId);
  next();
});

//show my URLs page
urlRouter.get('/', (req, res) => {
  getUrls(req, res);
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
  res.render('singleUrl', { id: req.params.id });
});

//check if the shortend url exsits in json before jumping to the actual page
urlRouter.get('/u/:id', (req, res) => {
  checkUrlExsistance(req, res);
});

//edit URL
urlRouter.post('/:id', (req, res) => {
  console.log('edited');
  updateUrl(req, res);
});

//delete URL
urlRouter.post('/:id/delete', (req, res) => {
  deleteUrl(req, res);
});

export default urlRouter;
