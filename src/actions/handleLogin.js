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

      const token = googleUser.getAuthResponse().id_token;

      fetch('http://localhost:5000/api/v1/auth/google', {
        method: 'POST',
        token: token,
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'token=' + token,
      })
        .then((res) => res.json())
        .then((body) => {
          dispatch({
            type: LOG_IN_SUCCESS,
            payload: {
              name: profile.getName(),
              token: token,
            },
          });
        });
    });
  };
};
