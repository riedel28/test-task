import api from '../api';

export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

export const createPost = (post: any) => {
  return async (dispatch: any, getState: any) => {
    dispatch({ type: CREATE_POST_REQUEST });

    const token = getState().auth.user.token;

    try {
      const response = await api.post('/feeds', post, {
        headers: {
          'x-access-token': token,
        },
      });

      dispatch({ type: CREATE_POST_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: CREATE_POST_FAILURE, payload: error });
    }
  };
};
