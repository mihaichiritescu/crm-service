// tslint:disable: no-object-mutation
import test from 'ava';

import { getPort, processEnvironmentVariables } from './helpers';

test('When `getPort` is called Then it returns the default value of 8800', t => {
  t.plan(1);
  t.is(getPort(), 8800);
});

test('Given not all required environment variables are set When `processEnvironmentVariables` is called Then it throws an error', async t => {
  t.plan(1);

  process.env = { BASE_URL: 'BASE_URL' };
  await t.throwsAsync(async () => {
    await processEnvironmentVariables();
  });
});

test('Given all required environment variables are set When `processEnvironmentVariables` is called Then it does not throw an error', async t => {
  t.plan(1);

  process.env = {
    APPLICATION_NAME: 'APPLICATION_NAME',
    BASE_URL: 'BASE_URL',
    DATABASE_HOST: 'DATABASE_HOST',
    DATABASE_NAME: 'DATABASE_NAME',
    DATABASE_PASSWORD: 'DATABASE_PASSWORD',
    DATABASE_PORT: 'DATABASE_PORT',
    DATABASE_USER: 'DATABASE_USER',
    ENVIRONMENT: 'ENVIRONMENT',
    PRODUCT: 'PRODUCT'
  };
  await t.notThrowsAsync(async () => {
    await processEnvironmentVariables();
  });
});
