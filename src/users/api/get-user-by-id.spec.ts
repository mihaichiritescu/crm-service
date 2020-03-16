/*import test from 'ava';
import { close, getClient, getNewPool } from 'lls-lib-postgres';
import request from 'supertest';

import {
  ENVIRONMENT_VARIABLES,
  ID,
  NAME,
  USER_ID
} from '../../test-support/data';
import { deleteAllTables } from '../../test-support/database';
import { Instance } from '../../types/types';
import { createInstance } from '../instance';

// tslint:disable-next-line: no-let
let client: any;
const pool = getNewPool();
// tslint:disable-next-line: no-let
let server: any;

test.beforeEach(async () => {
  // tslint:disable-next-line: no-object-mutation
  process.env = ENVIRONMENT_VARIABLES;

  server = require('../../index').default;

  client = await getClient(pool);
  await deleteAllTables(client);
});

test.afterEach(async () => {
  server.close();

  await deleteAllTables(client);
  client.release();
});

test.after(() => {
  close(pool);
});

test('Given an invalid id When `GET` `/instances/:instanceId` is called Then it returns a 404 status', async t => {
  t.plan(1);

  const response = await request(server).get(`/v1/instances/${ID}`);
  t.is(response.status, 404);
});

test('Given a valid id When `GET` `/instances/:instanceId` is called Then it returns a 200 status', async t => {
  t.plan(1);

  const instance = (await createInstance(client, NAME, USER_ID)) as Instance;

  const response = await request(server).get(`/v1/instances/${instance.id}`);
  t.is(response.status, 200);
});
test('Given a valid id When `GET` `/instances/:instanceId` is called Then it returns the instance', async t => {
  t.plan(1);

  const instance = (await createInstance(client, NAME, USER_ID)) as Instance;

  const response = await request(server).get(`/v1/instances/${instance.id}`);
  t.deepEqual(response.body, instance);
});
*/