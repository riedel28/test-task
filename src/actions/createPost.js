import axios from 'axios';
import rootApiUrl from './../helpers/rootApiUrl.js';

export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

export const createPost = (post) => {
  return async (dispatch, getState) => {
    dispatch({ type: CREATE_POST_REQUEST });

    const token = getState().auth.user.token;

    try {
      const response = await axios.post(`${rootApiUrl}/feeds`, post, {
        headers: {
          accept: 'application/json',
          'x-access-token': token,
        },
      });

      dispatch({ type: CREATE_POST_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: CREATE_POST_FAILURE, payload: error });
    }
  };
};
