// tslint:disable: typedef
import { NextFunction, Request, Response } from 'express';
import { readJSONFile, PATH_TO_VERSION_FILE } from './helpers';

export const corsHeadersFor = (...origins: ReadonlyArray<string>) => {
    return function helpers_CorsHeaders(
      _: Request,
      res: Response,
      next: NextFunction
    ) {
      res.header(
        'Access-Control-Allow-Origin',
        origins.length ? origins.join(' ') : '*'
      );
      res.header(
        'Access-Control-Allow-Methods',
        'DELETE,GET,HEAD,OPTIONS,PATCH,POST'
      );
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers'
      );
      next();
    };
  };

  export const setupVersionRoute = (app: any) => {
    app.get('^/v1/version$', async (_: Request, res: Response) => {
      const fromFile = readJSONFile(PATH_TO_VERSION_FILE) || {};
      const { pid, platform, ppid, version } = process;
  
      res.status(200).send({
        ...fromFile,
        cpu: process.cpuUsage(),
        memory: process.memoryUsage(),
        nodeVersion: version,
        pid,
        platform,
        ppid,
        uptime: process.uptime()
      });
    });
  };