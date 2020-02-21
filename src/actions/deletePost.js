import axios from 'axios';
import rootApiUrl from './../helpers/rootApiUrl.js';

export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const deletePost = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: DELETE_POST_REQUEST });

    const token = getState().auth.user.token;

    // console.log(token);

    axios
      .delete(`${rootApiUrl}/feeds/${id}`, {
        headers: {
          accept: 'application/json',
          'x-access-token': token,
        },
      })
      // fetch(`${rootApiUrl}/feeds/${id}`, {
      //   method: 'DELETE',
      //   headers: {
      //     accept: 'application/json',
      //     'x-access-token': token,
      //   },
      // })
      //   .then((res) => {
      //     return res.json();
      //   })
      .then((data) => {
        console.log(data);
        dispatch({ type: DELETE_POST_REQUEST, payload: data._id });
      })
      .catch((error) => {
        dispatch({ type: DELETE_POST_FAILURE, payload: error });
      });
  };
};
