import express from 'express';
import { createUrl, updateUrl, getUrl } from '../controllers/urls.js';
// import cookieParser from 'cookie-parser';
import { getUrls } from '../controllers/getUrls.js';
import { checkUrlExsistance } from '../controllers/checkUrlExsistance.js';
import { deleteUrl } from '../controllers/deleteUrl.js';
import session from 'express-session';
const urlRouter = express.Router();

// urlRouter.use(cookieParser());

// urlRouter.use((req, res, next) => {
//   // const userId = req.cookies.userId;
//   //DO NOT DELETE ↓
//   // if (!userId) {
//   //   return res.render('error', {
//   //     errorMessage: 'you need to login first to see your URL list',
//   //   });
//   // }
//   // console.log(userId);
//   next();
// });
urlRouter.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  }),
);
//show my URLs page
urlRouter.get('/', (req, res) => {
  console.log('urls', req.session.user);
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
  getUrl(req, res);
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
