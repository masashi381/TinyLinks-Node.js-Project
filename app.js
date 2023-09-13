import express from 'express';
import urlRouter from './routes/urls.js';
import authRoute from './routes/auth.js';
import dotenv from 'dotenv';

//envファイル用
dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('hello');
});

app.use('/urls', urlRouter);
app.use('/auth', authRoute);

const HOST = 'localhost';

app.listen(process.env.PORT, HOST, () =>
  console.log(`server running on HTTP://${HOST}:${process.env.PORT}`),
);
