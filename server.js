import express from 'express';
import urlRouter from './routes/urls.js';
import authRoute from './routes/auth.js';
const server = express();

server.set('view engine', 'ejs');
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/', (req, res) => {
  res.send('hello');
});

server.use('/urls', urlRouter);
server.use('/auth', authRoute);

export default server;
