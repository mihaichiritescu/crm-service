import test from 'ava';
import { close, getClient, getNewPool } from 'lls-lib-postgres';
import request from 'supertest';

import {
  ENVIRONMENT_VARIABLES,
  INSTANCE,
  NAME,
  USER_ID
} from '../../test-support/data';
import { deleteAllTables } from '../../test-support/database';
import { findAllInstances } from '../instance';

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

const INSTANCE_PAYLOAD = {
  name: NAME,
  userId: USER_ID
};

test('Given an invalid instance object When sent to `POST` `/instances` Then it returns a 400 status', async t => {
  t.plan(1);

  const response = await request(server)
    .post('/v1/instances')
    .send({});

  t.is(response.status, 400);
});

test('Given a valid instance object When sent to `POST` `/instances` Then it returns a 201 status', async t => {
  t.plan(1);

  const response = await request(server)
    .post('/v1/instances')
    .send(INSTANCE_PAYLOAD);

  t.is(response.status, 201);
});
test('Given a valid instance object When sent to `POST` `/instances` Then it returns the created instance', async t => {
  t.plan(1);

  const response = await request(server)
    .post('/v1/instances')
    .send(INSTANCE_PAYLOAD);

  t.deepEqual(Object.keys(response.body).sort(), Object.keys(INSTANCE).sort());
});
test('Given a valid instance object When sent to `POST` `/instances` Then it adds an instance to the table', async t => {
  t.plan(3);

  const results1 = await findAllInstances(client);
  t.is(results1.length, 0);

  const response = await request(server)
    .post('/v1/instances')
    .send(INSTANCE_PAYLOAD);

  const results2 = await findAllInstances(client);
  t.is(results2.length, 1);
  t.deepEqual([response.body], results2);
});
