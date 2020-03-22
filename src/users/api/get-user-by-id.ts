import { Request, RequestHandler, Response } from 'express';
import { findUserById } from '../user';

export const getUserById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const user = await findUserById(req.params.userId);

  user
    ? res.status(200).send(user)
    : res.status(404).send({ message: 'No user exists with that id.' });
};
