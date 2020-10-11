import axios from 'axios';
import rootApiUrl from './../helpers/rootApiUrl.js';

export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const deletePost = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: DELETE_POST_REQUEST });

    const token = getState().auth.user.token;

    try {
      const response = await axios.delete(`${rootApiUrl}/feeds/${id}`, {
        headers: {
          accept: 'application/json',
          'x-access-token': token,
        },
      });

      dispatch({ type: DELETE_POST_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: DELETE_POST_FAILURE, payload: error });
    }
  };
};
