import './pre-start'; // Must be the first import
import logger from 'jet-logger';

import EnvVars from '@src/common/EnvVars';
import server from './server';

import { AppDataSource } from "./data-source";
// **** Run **** //

const SERVER_START_MSG = ('Express server started on port: ' +
  EnvVars.Port.toString());

AppDataSource.initialize()
  .then(async () => {
    server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
  })
  .catch((e) => console.log(e));


