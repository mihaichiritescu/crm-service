import { Request, RequestHandler, Response } from 'express';
import { createUser } from '../user';

export const postUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const user = await createUser(req.body.name);

  user
    ? res.status(200).send(user)
    : res.status(404).send({ message: 'No user exists with that id.' });
};
