import api from '../api';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const handleLogin = () => {
  return async (dispatch: any) => {
    dispatch({
      type: LOG_IN_REQUEST,
    });

    window.gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(async (googleUser: any) => {
        const profile = googleUser.getBasicProfile();
        const token = googleUser.getAuthResponse().id_token;

        console.log(profile);
        console.log(token);

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
            payload: {
              name: profile.getName(),
              token: error,
            },
          });
        }
      });
  };
};
