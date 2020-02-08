export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

export const SIGN_OUT = 'SIGN_OUT';

export const handleLogin = (email, password) => {
  return (dispatch) => {
    dispatch({
      type: SIGN_IN_REQUEST,
    });

    fetch('https://mysterious-reef-29460.herokuapp.com/api/v1/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status === 'ok') {
          dispatch({
            type: SIGN_IN_SUCCESS,
            payload: body.data.id,
          });
        } else {
          dispatch({
            type: SIGN_IN_FAILURE,
            payload: body.message,
          });
        }
      })
      .catch((error) => {});
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};
