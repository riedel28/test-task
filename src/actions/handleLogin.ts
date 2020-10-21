import api from '../api';
import { Dispatch } from 'redux';

import { AuthAction } from '../reducers/auth';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const handleLogin = () => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: LOG_IN_REQUEST,
    });

    window.gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(async (googleUser) => {
        const profile = googleUser.getBasicProfile();
        const token = googleUser.getAuthResponse().id_token;

        try {
          const response = await api.post('/auth/google', { token });

          dispatch({
            type: LOG_IN_SUCCESS,
            payload: {
              name: profile.getName(),
              token: response.data.token,
            },
          });
        } catch (error) {
          dispatch({
            type: LOG_IN_FAILURE,
            payload: error,
          });
        }
      });
  };
};
