import {
  findFirstRowWithId,
  insertOneRow
} from 'lls-lib-postgres';

import { TABLES } from '../enums';

import {
  User,
  UserInsert,
  UserObject,
  UserRow
} from '../types/types';

export const _normalize = (
  user: UserRow | undefined
): User | undefined => {
  return user
    ? {
        createdAt: user.created_at && user.created_at.toISOString(),
        id: user.id,
        name: user.name,
        updatedAt: user.updated_at && user.updated_at.toISOString()
      }
    : undefined;
};

export const _serialize = (
  user: User | UserObject | undefined
): UserInsert | undefined => {
  return user
    ? {
        name: user.name
      }
    : undefined;
};

export const findUserById = async (client: any, id: string) => {
  return _normalize(await findFirstRowWithId(client, TABLES.USERS, id));
};

export const createUser = async (client: any, name: string) => {
  return _normalize(
    await insertOneRow(client, TABLES.USERS, _serialize({ name: name }))
  );
};

