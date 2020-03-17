import { deleteAll } from 'lls-lib-postgres';

import { TABLES } from '../enums';

export const deleteTable = async (client: any, table: string) => {
  return deleteAll(client, table);
};

export const deleteAllTables = async (client: any) => {
  await deleteTable(client, TABLES.USERS);
};
