import { v4 as uuidv4 } from 'uuid';
import session from 'express-session';
import { readWriteFile, writeToFile, validateUrl } from '../helpers/utils.js';

const uuid = uuidv4();

export const sessionConfig = () => {
  session({
    secret: 'secret', // Replace with a strong secret, preferably from an environment variable
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  });
};

export const registeredNewUsers = (req, res) => {
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
  }
};
