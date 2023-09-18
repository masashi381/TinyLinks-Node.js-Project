import path from 'path';
import { readWriteFile, writeToFile } from '../helpers/utils.js';
import { uuid } from '../helpers/users.js';
import data from '../models/users.json' assert { type: 'json' };
import { execSync } from 'child_process';
const filePath = path.join(path.resolve(), '/models/users.json');

export const registeredNewUsers = (req, res) => {
  const { name, email, password } = req.body;
  // Basic validation
  if (!name || !email || !password) {
    res.render('register', {
      errorMessage: 'Please fill in all fields',
    });
  } else {
    // set Duplicate
    const existedUsers = Object.values(data);

    let setDuplicate = false;
    function findDuplicateEmail(data, i) {
      existedUsers.forEach((key, index) => {
        if (i !== index && key.email === email) {
          setDuplicate = true;
        }
      });
    }

    existedUsers.forEach((key, index) => {
      findDuplicateEmail(key, index);
    });

    if (setDuplicate) {
      res.render('register', {
        errorMessage: 'Email already exists',
      });
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
        console.log('test');

        Object.assign(jsonData, newUser);

        writeToFile(filePath, jsonData, (err) => {
          if (err) {
            res.status(500).json(err);
          }
        });
      });

      req.session.regenerate((err) => {
        if (err) next(err);
        console.log('here', req.session);
        console.log('sessionId', req.sessionID);
        req.session.user = newUser[uuid].id;

        console.log('get session user', req.session.user);

        req.session.save((err) => {
          if (err) {
            return next(err);
          }
          console.log('save: ', req.session.user);
          res.redirect('/auth/login');
        });
      });

      // Object.assign(authJson, newUser);
      // authJson.push(newUser); // Push the new user to your user data

      // Store the user's ID in the session

      // res.render('/urls');
    }
  }
};
