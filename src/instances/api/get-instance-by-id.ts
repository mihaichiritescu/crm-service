import { Request, RequestHandler, Response } from 'express';
import { getClient } from 'lls-lib-postgres';

import { findInstanceById } from '../instance';

export const getInstanceById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const client = await getClient();
  try {
    const instance = await findInstanceById(client, req.params.instanceId);

    instance
      ? res.status(200).send(instance)
      : res.status(404).send({ message: 'No instance exists with that id.' });
  } finally {
    client.release();
  }
};
