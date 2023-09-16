// import pkg from 'express-session';
// import server from '../server.js';
// //set cookie session
// const { session } = pkg;

// export const setCookie = () => {
//   server.use(
//     session({
//       secret: 'secret',
//       resave: false,
//       saveUninitialized: true,
//       cookie: { maxAge: 24 * 60 * 60 * 1000 },
//     }),
//   );
// };

// export const isAuthenticated = (req, res, next) => {
//   if (req.session.user) {
//     next();
//   } else {
//     next('route');
//   }
// };
