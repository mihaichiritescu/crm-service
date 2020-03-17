import { Application } from 'express';

import { getUserById, postUser } from './api';

export default (app: Application) => {
  app.get('^/v1/users/:userId$', getUserById);
  app.post('^/v1/users$', postUser);
};


