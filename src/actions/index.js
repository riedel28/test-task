export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

export const SIGN_OUT = 'SIGN_OUT';

export const FETCH_USER_INFO_REQUEST = 'FETCH_USER_INFO_REQUEST';
export const FETCH_USER_INFO_SUCCESS = 'FETCH_USER_INFO_SUCCESS';
export const FETCH_USER_INFO_FAILURE = 'FETCH_USER_INFO_FAILURE';

export const FETCH_NEWS_REQUEST = 'FETCH_NEWS_REQUEST';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_FAILURE = 'FETCH_NEWS_FAILURE';

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

export const fetchUserData = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_USER_INFO_REQUEST });

    fetch(`https://mysterious-reef-29460.herokuapp.com/api/v1/user-info/${id}`)
      .then((response) => response.json())
      .then((body) => {
        if (body.status === 'ok') {
          dispatch({ type: FETCH_USER_INFO_SUCCESS, payload: body.data });
        }

        if (body.status === 'err') {
          dispatch({ type: FETCH_USER_INFO_FAILURE, payload: body.message });
        }
      })
      .catch((error) => {});
  };
};

export const fetchNews = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_NEWS_REQUEST });

    fetch(`https://mysterious-reef-29460.herokuapp.com/api/v1/news`)
      .then((response) => response.json())
      .then((body) => {
        if (body.status === 'ok') {
          dispatch({ type: FETCH_NEWS_SUCCESS, payload: body.data });
        }

        if (body.status === 'err') {
          dispatch({ type: FETCH_USER_INFO_FAILURE, payload: body.message });
        }
      })
      .catch((error) => {});
  };
};
