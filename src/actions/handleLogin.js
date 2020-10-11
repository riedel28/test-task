import axios from 'axios';
import rootApiUrl from './../helpers/rootApiUrl.js';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const handleLogin = (email, password) => {
  return async (dispatch) => {
    dispatch({
      type: LOG_IN_REQUEST,
    });

    const auth2 = await window.gapi.auth2.getAuthInstance();

    auth2.signIn().then(async (googleUser) => {
      const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;

      try {
        const response = await axios.post(
          `${rootApiUrl}/auth/google`,
          { token },
          {
            accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        );

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
          payload: {
            name: profile.getName(),
            token: error,
          },
        });
      }
    });
  };
};
