import { v4 as uuidv4 } from 'uuid';
import authJson from '../models/users.json' assert { type: 'json' };

//register users (post request)
export const registerUser = (req, res) => {
  const uuid = uuidv4();
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
    authJson[newUserObject];
    res.send(newUserObject);
  }
};
