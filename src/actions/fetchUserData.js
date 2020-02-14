import rootApiUrl from './../helpers/rootApiUrl.js';

export const FETCH_PROFILE_INFO_REQUEST = 'FETCH_USER_INFO_REQUEST';
export const FETCH_PROFILE_INFO_SUCCESS = 'FETCH_USER_INFO_SUCCESS';
export const FETCH_PROFILE_INFO_FAILURE = 'FETCH_USER_INFO_FAILURE';

export const fetchUserData = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_PROFILE_INFO_REQUEST });

      const response = await fetch(`${rootApiUrl}/user-info/${id}`);
      const json = await response.json();

      if (json.status === 'ok') {
        console.log(json);

        dispatch({ type: FETCH_PROFILE_INFO_SUCCESS, payload: json.data });
      }

      if (json.status === 'err') {
        dispatch({ type: FETCH_PROFILE_INFO_FAILURE, payload: json.message });
      }
    } catch (error) {
      dispatch({
        type: FETCH_PROFILE_INFO_FAILURE,
        payload: error.message || 'Something went wrong',
      });
    }
  };
};
