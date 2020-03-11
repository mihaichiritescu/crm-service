import { Request, RequestHandler, Response } from 'express';
import { getClient } from 'lls-lib-postgres';

import { createInstance } from '../instance';

export const postInstances: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const client = await getClient();
  try {
    const { name, userId } = req.body;
    const instance = await createInstance(client, name, userId);
    res.status(201).send(instance);
  } catch (e) {
    res
      .status(400)
      .send({ message: `Could not create foobarbaz instance. ${e.message}` });
  } finally {
    client.release();
  }
};
