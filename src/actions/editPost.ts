import api from '../api';

export const EDIT_POST_REQUEST = 'EDIT_POST_REQUEST';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE';

export const editPost = (id: any, post: any) => {
  return async (dispatch: any, getState: any) => {
    dispatch({ type: EDIT_POST_REQUEST });

    const token = getState().auth.user.token;

    try {
      const response = await api.put(`/feeds/${id}`, post, {
        headers: {
          'x-access-token': token,
        },
      });

      dispatch({ type: EDIT_POST_SUCCESS, payload: response.data.feed });
    } catch (error) {
      dispatch({ type: EDIT_POST_FAILURE, payload: error });
    }
  };
};
