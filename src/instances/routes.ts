import { Application } from 'express';

import { getInstanceById, postInstances } from './api';

export default (app: Application) => {
  app.get('^/v1/instances/:instanceId$', getInstanceById);
  app.post('^/v1/instances$', postInstances);
};
