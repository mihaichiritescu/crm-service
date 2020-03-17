// tslint:disable-next-line:no-var-requires
process.env.NEW_RELIC_LICENSE_KEY && require('newrelic');

import { getPort, processEnvironmentVariables } from './helpers';
try {
  processEnvironmentVariables();
} catch (_) {
  process.exit(1);
}

import parser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import {
  corsHeadersFor,
  environmentVariableToBoolean,
  setupVersionRoute
} from 'lls-lib-helpers';
import { errorLogger, logger, requestLogger } from 'lls-lib-log';

const app = express();
setupVersionRoute(app);

app.enable('trust proxy');
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(corsHeadersFor('*'));
environmentVariableToBoolean(process.env.LOG_ALL_REQUESTS) &&
  app.use(requestLogger);

import setupUserRoutes from './users/routes';
setupUserRoutes(app);

app.use(errorLogger);
app.use((_err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).send('Something went wrong!');
});

export default app.listen(getPort(), () => {
  logger.info(`foobarbaz service is listening on port ${getPort()}.`);
});
