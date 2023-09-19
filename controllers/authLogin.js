import path from 'path';
import { readWriteFile } from '../helpers/utils.js';
import { uuid } from '../helpers/users.js';
const filePath = path.join(path.resolve(), '/models/users.json');

// post login info
export const loginUser = (req, res) => {
  // Authenticate the user here
  const { email, password } = req.body;

  if (email === '' || password === '') {
    res.render('login', {
      errorMessage: 'Please fill in all fields',
      name: '',
    });
  } else {
    const loginId = {
      [uuid]: {
        id: uuid,
        email: '',
        password: '',
      },
    };

    console.log('loginId: ', loginId);
    readWriteFile(filePath, (err, jsonData) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (!jsonData) {
        jsonData = {};
      }
      const jsonDataArr = Object.values(jsonData);

      const user = jsonDataArr.find(
        (user) => user.email === email && user.password === password,
      );

      if (user) {
        // if email and password params match an existing user:
        req.session.regenerate((err) => {
          if (err) next(err);
          req.session.user = user.id;
          req.session.name = user.name;

          req.session.save((err) => {
            if (err) {
              return next(err);
            }
            res.redirect('/urls');
          });
        });
      } else {
        //if email or password params don't match an existing user:
        res.render('login', {
          errorMessage: 'Incorrect email or password',
          name: '',
        });
      }
    });
  }
};
