import express from 'express';
import path from 'path';
import fs from 'fs';
import urlRouter from './routes/urls.js';
import authRoute from './routes/auth.js';
import cookieParser from 'cookie-parser';
const server = express();

server.set('view engine', 'ejs');
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));

server.use(cookieParser());

server.get('/', (req, res) => {
  const userId = req.cookies.userid;
  //DO NOT DELETE ↓
  // if (!userId) {
  //   return res.redirect('/login');
  // }
  res.redirect('/urls');
});
// const filePath = path.join(path.resolve(), './public/JS/script.js');
// server.post('/auth/register', (req, res) => {
//   res.sendFile(filePath);
//   if (req.body.name === '') {
//     fs.readFile(filePath, 'utf8', (err, data) => {
//       if (err) {
//         console.log('error reading file');
//       } else {
//         data;
//       }
//     });
//   }
// });

server.use('/urls', urlRouter);
server.use('/auth', authRoute);

export default server;
