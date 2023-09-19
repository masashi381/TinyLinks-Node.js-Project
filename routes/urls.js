import express from 'express';
import { createUrl, updateUrl, getUrl } from '../controllers/urls.js';
import { getUrls } from '../controllers/getUrls.js';
import { checkUrlExsistance } from '../controllers/checkUrlExsistance.js';
import { deleteUrl } from '../controllers/deleteUrl.js';
const urlRouter = express.Router();

urlRouter.use((req, res, next) => {
  if (!req.session.user) {
    return res.render('error', {
      errorMessage: 'you need to login first!',
      name: '',
    });
  }
  req.userId = req.session.user;
  req.userName = req.session.name;
  next();
});

//show my URLs page
urlRouter.get('/', (req, res) => {
  getUrls(req, res, req.userId, req.userName);
});

//show create new URL page
urlRouter.get('/new', (req, res) => {
  res.render('newUrl', { name: req.userName });
});

//submit new URL
urlRouter.post('/', (req, res) => {
  createUrl(req, res, req.userId);
});

//check if the shortened url exits in json before jumping to the actual page
urlRouter.get('/u/:id', (req, res) => {
  checkUrlExsistance(req, res, req.userId);
});

//show single URL page
urlRouter.get('/:id', (req, res) => {
  getUrl(req, res, req.userId, req.userName);
});

//edit URL
urlRouter.post('/:id', (req, res) => {
  updateUrl(req, res, req.userId);
});

//delete URL
urlRouter.post('/:id/delete', (req, res) => {
  deleteUrl(req, res, req.userId);
});

export default urlRouter;
