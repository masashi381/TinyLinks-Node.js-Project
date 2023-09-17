import path from 'path';
import { readWriteFile, writeToFile } from '../helpers/utils.js';
import { uuid } from '../helpers/users.js';

const filePath = path.join(path.resolve(), '/models/users.json');

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
      console.log('test');

      // const jsonDataArr = Object.values(jsonData);
      // const checkedUsers = Array.from(new Set(jsonDataArr));
      // if (!checkedUsers) {
      //   // console.log('checkedUsers', checkedUsers);
      //   console.log('error', checkedUsers);
      // } else {
      // }
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
      req.session.user = newUser[uuid].id;

      console.log('get session user', req.session.user);

      req.session.save((err) => {
        if (err) {
          console.log('err');
          return next(err);
        }
        // res.send('Registration Successful');
        console.log('save: ', req.session.user);
        res.redirect('/auth/login');
      });
    });

    // Object.assign(authJson, newUser);
    // authJson.push(newUser); // Push the new user to your user data

    // Store the user's ID in the session

    // res.render('/urls');
  }
};
