import express from 'express';
import { createUrl, updateUrl, getUrl } from '../controllers/urls.js';
import { getUrls } from '../controllers/getUrls.js';
import { checkUrlExsistance } from '../controllers/checkUrlExsistance.js';
import { deleteUrl } from '../controllers/deleteUrl.js';
import session from 'express-session';

const urlRouter = express.Router();

urlRouter.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  }),
);

urlRouter.use((req, res, next) => {
  const userId = req.session.user;
  if (!userId) {
    return res.render('error', {
      errorMessage: 'you need to login first to see your URL list',
    });
  }
  next();
});

//show my URLs page
urlRouter.get('/', (req, res) => {
  const userId = req.session.user;
  getUrls(req, res, userId);
});

//show create new URL page
urlRouter.get('/new', (req, res) => {
  res.render('newUrl');
});

//submit new URL
urlRouter.post('/', (req, res) => {
  const userId = req.session.user;
  createUrl(req, res, userId);
});

//show single URL page
urlRouter.get('/:id', (req, res) => {
  const userId = req.session.user;
  getUrl(req, res, userId);
});

//check if the shortend url exsits in json before jumping to the actual page
urlRouter.get('/u/:id', (req, res) => {
  checkUrlExsistance(req, res);
});

//edit URL
urlRouter.post('/:id', (req, res) => {
  const userId = req.session.user;
  console.log('edited');
  updateUrl(req, res, userId);
});

//delete URL
urlRouter.post('/:id/delete', (req, res) => {
  deleteUrl(req, res);
});

export default urlRouter;
