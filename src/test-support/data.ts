import { User, UserInsert, UserObject } from '../types/types';

export const ENVIRONMENT_VARIABLES = {
  APPLICATION_NAME: 'APPLICATION_NAME',
  BASE_URL: 'BASE_URL',
  DATABASE_HOST: 'DATABASE_HOST',
  DATABASE_NAME: 'DATABASE_NAME',
  DATABASE_PASSWORD: 'DATABASE_PASSWORD',
  DATABASE_PORT: 'DATABASE_PORT',
  DATABASE_USER: 'DATABASE_USER',
  ENVIRONMENT: 'local',
  PRODUCT: 'llc'
};

export const NAME = 'Tester McTester';
export const CREATED_AT = new Date('2018-01-01T00:00:00.000Z');
export const ID = Math.floor(Math.random() * Math.floor(10000)).toString();
export const UPDATED_AT = new Date('2018-01-01T00:00:00.000Z');
export const USER_ID = '8916862a-1a9d-432e-9fc8-a9a8a40567a0';

export const INSTANCE_OBJECT: UserObject = {
  name: NAME
};

export const INSTANCE: User = {
  ...INSTANCE_OBJECT,
  createdAt: CREATED_AT.toISOString(),
  id: ID,
  updatedAt: UPDATED_AT.toISOString()
};

export const INSTANCE_INSERT: UserInsert = {
  name: NAME
};
