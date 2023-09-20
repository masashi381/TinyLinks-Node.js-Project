import path from 'path';
import { readWriteFile, writeToFile } from '../helpers/utils.js';
import { v4 as uuidv4 } from 'uuid';
const filePath = path.join(path.resolve(), '/models/users.json');

export const registeredNewUsers = (req, res) => {
  const uuid = uuidv4();
  const { name, email, password } = req.body;
  // Basic validation
  if (!name || !email || !password) {
    res.render('register', {
      errorMessage: 'Please fill in all fields',
      name: '',
    });
  } else {
    readWriteFile(filePath, (err, jsonData) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (!jsonData) {
        jsonData = {};
      }

      // set Duplicate of email

      const existedUsers = Object.values(jsonData);

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
          name: '',
        });
      } else {
        // Create a new user with a UUID
        const newUser = {
          [uuid]: {
            id: uuid,
            name,
            email,
            password,
          },
        };

        Object.assign(jsonData, newUser);

        writeToFile(filePath, jsonData, (err) => {
          if (err) {
            return res.status(500).json(err);
          }

          req.session.regenerate((err) => {
            if (err) {
              return next(err);
            }
            req.session.user = newUser[uuid].id;
            req.session.name = newUser[uuid].name;

            req.session.save((err) => {
              if (err) {
                return next(err);
              }
              res.redirect('/urls');
            });
          });
        });
      }
    });
  }
};
