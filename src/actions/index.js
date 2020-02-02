import { checkCredentials } from '../helpers';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export const signIn = (username, password) => {
  return {
    type: SIGN_IN,
    payload: {
      isLoggedIn: checkCredentials(username, password),
      user: username,
    },
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};
