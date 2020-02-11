import rootApiUrl from './../helpers/rootApiUrl.js';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const handleLogin = (email, password) => {
  return async (dispatch) => {
    dispatch({
      type: LOG_IN_REQUEST,
    });

    const response = await fetch(`${rootApiUrl}/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const json = await response.json();

    if (json.status === 'ok') {
      dispatch({
        type: LOG_IN_SUCCESS,
        payload: json.data.id,
      });
    } else {
      dispatch({
        type: LOG_IN_FAILURE,
        payload: json.message,
      });
    }
  };
};
