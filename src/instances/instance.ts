import {
  findAllRows,
  findFirstRowWithId,
  insertOneRow
} from 'lls-lib-postgres';

import { TABLES } from '../enums';

import {
  Instance,
  InstanceInsert,
  InstanceObject,
  InstanceRow
} from '../types/types';

export const _normalize = (
  instance: InstanceRow | undefined
): Instance | undefined => {
  return instance
    ? {
        createdAt: instance.created_at && instance.created_at.toISOString(),
        id: instance.id,
        name: instance.name,
        updatedAt: instance.updated_at && instance.updated_at.toISOString(),
        userId: instance.user_id
      }
    : undefined;
};

export const _serialize = (
  instance: Instance | InstanceObject | undefined
): InstanceInsert | undefined => {
  return instance
    ? {
        name: instance.name,
        user_id: instance.userId
      }
    : undefined;
};

export const createInstance = async (
  client: any,
  name: string,
  userId: string
) => {
  return _normalize(
    await insertOneRow(client, TABLES.INSTANCES, _serialize({ name, userId }))
  );
};

export const findInstanceById = async (client: any, id: string) => {
  return _normalize(await findFirstRowWithId(client, TABLES.INSTANCES, id));
};

export const findAllInstances = async (client: any) => {
  return (
    await findAllRows(client, TABLES.INSTANCES, undefined, 'created_at', 'DESC')
  ).map(_normalize);
};
