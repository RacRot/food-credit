import express from 'express';
import path from 'path';

import hanlders from './handlers';

import errorHandler from './middlewares/errorHandler';

const server = express();

server.disable('x-powered-by');
if (process.env.NODE_ENV === 'production')
  server.enable('trust proxy');

server.use('/assets', express.static(path.join(__dirname, 'assets')));
server.use('/', hanlders);
server.use(errorHandler);

export default server;