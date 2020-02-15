export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const handleLogin = (email, password) => {
  return async (dispatch) => {
    dispatch({
      type: LOG_IN_REQUEST,
    });

    const auth2 = await window.gapi.auth2.getAuthInstance();
    auth2.signIn().then((googleUser) => {
      const profile = googleUser.getBasicProfile();

      dispatch({
        type: LOG_IN_SUCCESS,
        payload: profile.getName(),
      });
    });
  };
};
