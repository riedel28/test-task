export const FETCH_USER_INFO_REQUEST = 'FETCH_USER_INFO_REQUEST';
export const FETCH_USER_INFO_SUCCESS = 'FETCH_USER_INFO_SUCCESS';
export const FETCH_USER_INFO_FAILURE = 'FETCH_USER_INFO_FAILURE';

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
