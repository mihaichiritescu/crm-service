// tslint:disable: no-if-statement no-object-mutation
import yargs from 'yargs';

const argv = yargs.argv;

export const getMissingKeysOnObject = (
  obj: { readonly [key: string]: string | undefined },
  keys: ReadonlyArray<string>
): ReadonlyArray<string> =>
  keys.filter((key: string) => typeof obj[key] === 'undefined');

export const getPort = () => (argv.port ? argv.port : 8800);

export const processEnvironmentVariables = async () => {
  // ENV
  const missingEnv = getMissingKeysOnObject(process.env, [
    'APPLICATION_NAME',
    'BASE_URL',
    'DATABASE_HOST',
    'DATABASE_NAME',
    'DATABASE_PASSWORD',
    'DATABASE_PORT',
    'DATABASE_USER',
    'ENVIRONMENT',
    'PRODUCT'
  ]);

  if (missingEnv.length > 0) {
    throw new Error(
      'Required ENV variables are not set: [' + missingEnv.join(', ') + '].'
    );
  }
};
