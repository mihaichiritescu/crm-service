import { existsSync, readFileSync } from 'fs';

export const PATH_TO_VERSION_FILE = './version.json';

export const capitalize = (value: string): string =>
  value && value.charAt(0).toUpperCase() + value.slice(1);

export const environmentVariableToBoolean = (
value: string | undefined
): boolean => (value || '').toLowerCase() === 'true';

export const readJSONFile = (pathToFile: string, encoding: string = 'utf8') => {
    try {
      return (
        existsSync(pathToFile) && JSON.parse(readFileSync(pathToFile, encoding))
      );
    } catch (_) {
      return false;
    }
  };

export const titleize = (value: string): string =>
  value &&
  value
    .split(' ')
    .map(capitalize)
    .join(' ');
