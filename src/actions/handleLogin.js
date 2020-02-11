export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const handleLogin = (email, password) => {
  return (dispatch) => {
    dispatch({
      type: LOG_IN_REQUEST,
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
            type: LOG_IN_SUCCESS,
            payload: body.data.id,
          });
        } else {
          dispatch({
            type: LOG_IN_FAILURE,
            payload: body.message,
          });
        }
      })
      .catch((error) => {});
  };
};
