export const checkedLogin = (req, res) => {
  res.redirect('/urls');
};

// post login info
export const loginUser = (req, res) => {
  if (req.body.email === '') {
    console.log('Please enter your email');
  } else if (req.body.password === '') {
    console.log('Please enter your password');
  } else {
    console.log(req.body);
  }
};
