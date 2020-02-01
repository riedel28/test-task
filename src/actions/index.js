import { checkCredentials } from '../helpers';

export const LOG_IN = 'LOG_IN';

export const logIn = (username, password) => {
  return {
    type: LOG_IN,
    payload: checkCredentials(username, password),
  };
};
