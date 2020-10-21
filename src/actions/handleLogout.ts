import { Dispatch } from 'redux';

import { AuthAction } from '../reducers/auth';
export const LOG_OUT = 'LOG_OUT';

export const handleLogout = () => {
  return async (dispatch: Dispatch<AuthAction>) => {
    window.gapi.auth2
      .getAuthInstance()
      .signOut()
      .then(() => {
        dispatch({ type: LOG_OUT });
      });
  };
};
