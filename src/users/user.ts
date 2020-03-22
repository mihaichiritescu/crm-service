import { UserModel } from '../models/models';

export const findUserById = async (id: string) => {
  return UserModel.findByPk(id);
};

export const createUser = async (name: string) => {
  return UserModel.create({
    name
  });
};

