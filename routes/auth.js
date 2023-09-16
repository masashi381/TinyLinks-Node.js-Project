import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import session from 'express-session';
import path from 'path';
import { readWriteFile, writeToFile } from '../helpers/utils.js';
// import {
//   sessionConfig,
//   registeredNewUsers,
// } from '../controllers/authControllers.js';
const authRouter = express.Router();
const filePath = path.join(path.resolve(), '/models/users.json');

// Session configuration
authRouter.use(
  session({
    secret: 'secret', // Replace with a strong secret, preferably from an environment variable
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  }),
);
// authRouter.use('./controllers/authController.js', sessionConfig());
authRouter.use(express.json());
authRouter.use(express.urlencoded({ extended: true }));

// Create a new user with a UUID (Replace this with database logic)
const uuid = uuidv4();
// Mock user data (Replace this with a database)
const authJson = {
  [uuid]: {
    id: uuid,
    email: '',
    password: '',
  },
};

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  } else {
    return res.redirect('/auth/login');
  }
};

// Show login page
authRouter.get(
  '/login',
  /*isAuthenticated,*/ (req, res) => {
    // res.send('Login Page');
    res.render('login');
  },
);

// Handle login
authRouter.post('/login', (req, res) => {
  // Authenticate the user here, e.g., by checking credentials in a database

  const { email, password } = req.body;
  console.log('inputed : ', req.body);
  if (email === '' || password === '') {
    return res.send('Please fill in all fields');
  } else {
    readWriteFile(filePath, (err, jsonData) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (!jsonData) {
        jsonData = {};
      }
      const jsonDataArr = Object.values(jsonData);
      console.log('jsonDataArr: ', jsonDataArr);

      const user = jsonDataArr.find(
        (user) => user.email === email && user.password === password,
      );

      if (user) {
        // res.send('login success');
        res.redirect('/urls');
      } else {
        res.send('login failed');
      }
    });
  }
});

// Show register page
authRouter.get('/register', (req, res) => {
  // res.send('Register Page');
  res.render('register');
});

// Handle registration
authRouter.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  // Basic validation
  if (!name || !email || !password) {
    return res.send('Please fill in all fields');
  } else {
    // Create a new user with a UUID (Replace this with database logic)
    const newUser = {
      [uuid]: {
        id: uuid,
        name,
        email,
        password,
      },
    };
    console.log('newUser: ', newUser);

    readWriteFile(filePath, (err, jsonData) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (!jsonData) {
        jsonData = {};
      }

      // jsonData[uuid].push({
      //   newUser,
      // });

      Object.assign(jsonData, newUser);

      writeToFile(filePath, jsonData, (err) => {
        if (err) {
          return res.status(500).json(err);
        }
        // res.redirect('/urls');
        req.session.regenerate((err) => {
          if (err) {
            return next(err);
          } else {
            req.session.user = newUser;
            req.session.save((err) => {
              if (err) {
                return next(err);
              }

              return res.send('Registration Successful');
            });
          }
        });
      });
    });

    // Object.assign(authJson, newUser);
    // authJson.push(newUser); // Push the new user to your user data

    // Store the user's ID in the session

    // res.render('/urls');
  }
});

// Logout
authRouter.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/login');
  });
});

export default authRouter;
