// import express from 'express';

// import authJson from '../models/users.json' assert { type: 'json' };
// const authRouter = express.Router();
// authRouter.use(express.json());
// import { registerUser } from '../controllers/auth.js';
// import { checkedLogin, loginUser } from '../controllers/authLogin.js';

// // set cookies

// import { v4 as uuidv4 } from 'uuid';
// import path from 'path';
// import session from 'express-session';
// import server from '../server.js';

// // console.log('test:', uuid);

// //show my login page
// authRouter.get('/', (req, res) => {
//   res.send('Welcome');
// });

// //show login page
// authRouter.get('/login', (req, res) => {
//   checkedLogin(req, res);
// });

// // make a POST request to /login
// authRouter.post('/login', (req, res) => {
//   loginUser(req, res);
//   res.send('login successful');
// });

// // show register page
// authRouter.get('/register', (req, res) => {
//   console.log('results:', authJson);
//   res.render('register');
// });

// // make a POST request to /register
// authRouter.post('/register', (req, res) => {
//   // res.send('form works');
//   // registerUser(req, res);

//   const uuid = uuidv4();
//   // setCookie(req, res);
//   // isAuthenticated(req, res);
//   if (req.body.name === '') {
//     console.log('Please enter name');
//     // alert('Please enter name');
//   } else if (req.body.email === '') {
//     // res.send(alert('Please enter name'));
//     console.log('Please enter email');
//   } else if (req.body.password === '') {
//     // res.send(alert('Please enter password'));
//     console.log('Please enter password');
//   } else {
//     const newUser = {
//       [uuid]: {
//         name: req.body.name || '',
//         email: req.body.email || '',
//         password: req.body.password || '',
//       },
//     };
//     const newUserString = JSON.stringify(newUser);
//     const newUserObject = JSON.parse(newUserString);
//     console.log('newUser', newUserObject);

//     //set cookies
//     // const { session } = pkg;
//     server.use(
//       session({
//         secret: 'secret',
//         resave: false,
//         saveUninitialized: true,
//         cookie: { maxAge: 24 * 60 * 60 * 1000 },
//       }),
//     );

//     const isAuthenticated = (req, res, next) => {
//       if (req.session[uuid]) {
//         next();
//       } else {
//         next('route');
//       }
//     };

//     req.session.regenerate((err) => {
//       if (err) next(err);

//       req.session[uuid] = req.body[uuid];

//       req.session.save((err) => {
//         if (err) {
//           return next(err);
//         } else {
//           res.redirect('/login');
//         }
//       });
//     });
//   }
// });

// export default authRouter;

import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import session from 'express-session';
import path from 'path';
import { readWriteFile, writeToFile, validateUrl } from '../helpers/utils.js';

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

authRouter.use(express.json());

// Create a new user with a UUID (Replace this with database logic)
const uuid = uuidv4();
// const newUser = {
//   [uuid]: {
//     id: uuid,
//     name: '',
//     email: '',
//     password: '',
//   },
// };

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
    next();
  } else {
    res.redirect('/login');
  }
};

// Show login page
authRouter.get('/login', (req, res) => {
  // res.send('Login Page');
  res.render('login');
});

// Handle login
authRouter.post('/login', (req, res) => {
  // Authenticate the user here, e.g., by checking credentials in a database
  const { email, password } = req.body;
  // console.log('user: ', email, 'password: ', password);
  console.log('req.body', req.body);
  // Example of authentication (Replace with your logic)
  // const user = authJson.find(
  //   (u) => u.email === email && u.password === password,
  // );
  const user = {};
  for (const property in authJson) {
    if (property.email === email && property.password === password) {
      return (user = property);
    }
  }
  console.log('user: ', user);
  if (user) {
    // Store the user's ID in the session
    req.session.userId = user.id; // Replace with your user ID field
    // console.log(req.session.userId);
    // res.send('Login Successful');
    res.redirect('/urls');
  } else {
    res.send('Login Failed');
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
    res.send('Please fill in all fields');
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
        res.redirect('/urls');
      });
    });

    Object.assign(authJson, newUser);
    // authJson.push(newUser); // Push the new user to your user data

    // Store the user's ID in the session
    req.session.id = newUser.id;
    console.log('userId', req.session.id);
    res.send('Registration Successful');
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
