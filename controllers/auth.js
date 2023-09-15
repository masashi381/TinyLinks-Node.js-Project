import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import session from 'express-session';
import server from '../server.js';
// import { readWriteFile, writeToFile } from '../helpers/utils.js';
// import { setCookie, isAuthenticated } from '../helpers/users.js';

//register users (post request)
export const registerUser = (req, res) => {
  const uuid = uuidv4();
  // setCookie(req, res);
  // isAuthenticated(req, res);
  if (req.body.name === '') {
    console.log('Please enter name');
    // alert('Please enter name');
  } else if (req.body.email === '') {
    // res.send(alert('Please enter name'));
    console.log('Please enter email');
  } else if (req.body.password === '') {
    // res.send(alert('Please enter password'));
    console.log('Please enter password');
  } else {
    const newUser = {
      [uuid]: {
        name: req.body.name || '',
        email: req.body.email || '',
        password: req.body.password || '',
      },
    };
    const newUserString = JSON.stringify(newUser);
    const newUserObject = JSON.parse(newUserString);
    console.log('newUser', newUserObject);

    //set cookies
    // const { session } = pkg;
    server.use(
      session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 24 * 60 * 60 * 1000 },
      }),
    );

    const isAuthenticated = (req, res, next) => {
      if (req.session.user) {
        next();
      } else {
        next('route');
      }
    };

    req.session.regenerate((err) => {
      if (err) next(err);

      req.session.user = req.body.user;

      req.session.save((err) => {
        if (err) {
          return next(err);
        } else {
          res.redirect('/login');
        }
      });
    });
  }
};
