import path from 'path';
import { readWriteFile } from '../helpers/utils.js';
import { uuid } from '../helpers/users.js';
const filePath = path.join(path.resolve(), '/models/users.json');

// post login info
export const loginUser = (req, res) => {
  // Authenticate the user here, e.g., by checking credentials in a database
  const { email, password } = req.body;
  console.log('inputed : ', req.body);
  if (email === '' || password === '') {
    return res.send('Please fill in all fields');
  } else {
    const loginId = {
      [uuid]: {
        id: uuid,
        email: '',
        password: '',
      },
    };
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
        req.session.regenerate((err) => {
          if (err) next(err);
          console.log('here login', req.session);
          req.session.user = loginId[uuid].id;

          console.log('get login session user', req.session.user);

          req.session.save((err) => {
            if (err) {
              console.log('err');
              return next(err);
            }
            // res.send('Registration Successful');
            console.log('save login: ', req.session.user);
            res.redirect('/urls');
          });
        });
      } else {
        res.send('login failed');
      }
    });
    //session
  }
};
