import express from 'express';
import dotenv from 'dotenv';
import server from './server.js';

//envファイル用
dotenv.config();

const HOST = 'localhost';

server.listen(process.env.PORT, HOST, () =>
  console.log(`server running on HTTP://${HOST}:${process.env.PORT}`),
);
