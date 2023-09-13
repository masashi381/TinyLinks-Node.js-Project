import express from 'express';
import urlRouter from './routes/urls.js';
import dotenv from 'dotenv';

//envファイル用
dotenv.config();

const app = express();

app.use(express.json());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('hello');
});

app.use('/urls', urlRouter);

app.listen(process.env.PORT, () =>
  console.log(`server running on ${process.env.PORT}`),
);
