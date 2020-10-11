import axios from 'axios';
import rootApiUrl from './../helpers/rootApiUrl.js';

export const EDIT_POST_REQUEST = 'EDIT_POST_REQUEST';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE';

export const editPost = (id, post) => {
  return async (dispatch, getState) => {
    dispatch({ type: EDIT_POST_REQUEST });

    const token = getState().auth.user.token;

    try {
      const response = await axios.put(`${rootApiUrl}/feeds/${id}`, post, {
        headers: {
          accept: 'application/json',
          'x-access-token': token,
        },
      });

      dispatch({ type: EDIT_POST_SUCCESS, payload: response.data.feed });
    } catch (error) {
      dispatch({ type: EDIT_POST_FAILURE, payload: error });
    }
  };
};
