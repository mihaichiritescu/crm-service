import { Request, RequestHandler, Response } from 'express';
import { getClient } from 'lls-lib-postgres';

import { createUser } from '../user';
import { logger } from 'lls-lib-log';

export const postUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const client = await getClient();
  try {

    logger.warn("---------");
    logger.warn(req.body.name);

    const user = await createUser(client, req.body.name);

    user
      ? res.status(200).send(user)
      : res.status(404).send({ message: 'No user exists with that id.' });
  } 
  catch (ex) {
    logger.warn(ex);
  }
  finally {
    client.release();
  }
};
