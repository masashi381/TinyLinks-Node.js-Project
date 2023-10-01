import dotenv from 'dotenv';
import server from './server.js';

//env file
dotenv.config();

const HOST = 'localhost';

server.listen(process.env.PORT, HOST, () =>
  console.log(`server running on HTTP://${HOST}:${process.env.PORT}`),
);

export default app;
