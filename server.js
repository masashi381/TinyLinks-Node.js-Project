import express from 'express';
import path from 'path';
import urlRouter from './routes/urls.js';
import authRoute from './routes/auth.js';
import session from 'express-session';
// import isAuthenticated from './routes/auth.js';

const server = express();

server.set('view engine', 'ejs');
server.set('views', path.join(path.resolve(), 'views'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// server.use(express.static('public'));

server.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  }),
);

server.get('/', (req, res) => {
  console.log('localhost:3000', req.session.user);
  // const userId = req.cookies.userid;
  //DO NOT DELETE ↓
  // if (!userId) {
  //   return res.redirect('/login');
  // }
  // console.log('here');
  // res.redirect('/urls');
  if (req.session.user) {
    res.redirect('/urls');
    return;
  }
  res.redirect('/auth/login');
});

server.use('/urls', urlRouter);
server.use('/auth', authRoute);

export default server;
