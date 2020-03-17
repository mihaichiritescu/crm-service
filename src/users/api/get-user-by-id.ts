import { Request, RequestHandler, Response } from 'express';
import { getClient } from 'lls-lib-postgres';

import { findUserById } from '../user';

export const getUserById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const client = await getClient();
  try {
    const user = await findUserById(client, req.params.userId);

    user
      ? res.status(200).send(user)
      : res.status(404).send({ message: 'No user exists with that id.' });
  } finally {
    client.release();
  }
};