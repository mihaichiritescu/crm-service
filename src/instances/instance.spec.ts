import test from 'ava';
import { findAllRows, getClient, getNewPool } from 'lls-lib-postgres';

import { TABLES } from '../enums';
import {
  CREATED_AT,
  ID,
  INSTANCE,
  INSTANCE_INSERT,
  INSTANCE_OBJECT,
  NAME,
  UPDATED_AT,
  USER_ID
} from '../test-support/data';
import { deleteAllTables } from '../test-support/database';
import { Instance } from '../types/types';
import { _normalize, _serialize, createInstance } from './instance';

// tslint:disable-next-line: no-let
let client: any;
const pool = getNewPool();

test.beforeEach(async () => {
  client = await getClient(pool);
  await deleteAllTables(client);
});

test.afterEach(async () => {
  await deleteAllTables(client);
  client.release();
});

test('When `_serialize` is called with `undefined` Then it returns `undefined`', t => {
  t.plan(1);
  t.is(_serialize(undefined), undefined);
});
test('When `_serialize` is called with an instance object Then it returns an instance insert', t => {
  t.plan(1);

  const instanceObject = { ...INSTANCE_OBJECT };
  t.deepEqual(_serialize(instanceObject), INSTANCE_INSERT);
});

test('When `_normalize` is called with `undefined` Then it returns `undefined`', t => {
  t.plan(1);
  t.is(_normalize(undefined), undefined);
});
test('When `_normalize` is called with an instance row Then it returns an instance', t => {
  t.plan(1);

  const instanceRow = {
    ...INSTANCE_INSERT,
    created_at: CREATED_AT,
    id: ID,
    updated_at: UPDATED_AT
  };
  t.deepEqual(_normalize(instanceRow), INSTANCE);
});

test('When `createInstance` is called Then it adds an instance to the table', async t => {
  t.plan(2);

  const results1 = await findAllRows(client, TABLES.INSTANCES);
  t.is(results1.length, 0);

  await createInstance(client, NAME, USER_ID);

  const results2 = await findAllRows(client, TABLES.INSTANCES);
  t.is(results2.length, 1);
});
test('When `createInstance` is called Then it return the created instance', async t => {
  t.plan(1);

  const created = (await createInstance(client, NAME, USER_ID)) as Instance;
  t.deepEqual(created, {
    ...created,
    name: NAME,
    userId: USER_ID
  });
});
