import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { AuthAction, AuthState } from '../reducers/auth';

export const LOG_OUT = 'LOG_OUT';

type ThunkResult<R> = ThunkAction<R, AuthState, undefined, AuthAction>;

export const handleLogout = (): ThunkResult<void> => {
  return async (dispatch: Dispatch) => {
    window.gapi.auth2
      .getAuthInstance()
      .signOut()
      .then(() => {
        dispatch({ type: LOG_OUT });
      });
  };
};
