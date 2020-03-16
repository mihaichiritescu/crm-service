import { Application } from 'express';

import { getUserById } from './api';

export default (app: Application) => {
  app.get('^/v1/instances/:instanceId$', getUserById);
};
