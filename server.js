import express from 'express';
import path from 'path';
import urlRouter from './routes/urls.js';
import authRoute from './routes/auth.js';
import session from 'express-session';

const server = express();

server.set('view engine', 'ejs');
server.set('views', path.join(path.resolve(), 'views'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//session configuration
server.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  }),
);

server.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/urls');
    res.render('urls', { name: req.session.name });
    return;
  }
  res.redirect('/auth/login');
});

server.use('/urls', urlRouter);
server.use('/auth', authRoute);

export default server;
