import express from 'express';
import { createUrl } from '../controllers/urls.js';
import cookieParser from 'cookie-parser';
import urlData from '../models/urls.json' assert { type: 'json' };

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
  const userId = req.cookies.userId;
  // const data = urlData[userId];
  const data = urlData[12345667];
  res.render('urls', { data: data });
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

//URLをクリックした時にすぐに実際のURLに飛ぶのではなく、
//validationを挟む、そのためのエンドポイント
//validationの意味をなしているのか、、
urlRouter.get('/u/:id', (req, res) => {
  const urlId = req.params.id;
  console.log(urlId);
  // const userId = req.cookies.userId;
  const userId = '12345667';
  const exsistUrl = urlData[userId].find((data) => data.shortUrl === urlId);
  if (!exsistUrl) {
    return res.send("This shorten URL doesn't exsist");
  }
  res.redirect(exsistUrl.longUrl);
});

//edit URL
urlRouter.post('/:id', (req, res) => {
  console.log('edited');
});

//delete URL
urlRouter.post('/:id/delete', (req, res) => {
  // const userId = req.cookies.userId;
  // const itemId = req.params.id;
  const userId = '12345667';
  const itemId = 'DKCz0d';
  const data = urlData[userId];

  //おそらく修正必要
  if (data) {
    const deleteItemIndex = data.findIndex((data) => data.shortUrl === itemId);
    delete data[deleteItemIndex];
    res.redirect('/urls');
  }
});

export default urlRouter;
