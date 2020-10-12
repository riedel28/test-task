import api from '../api';

export const FETCH_POST_REQUEST = 'FETCH_NEWS_ITEM_REQUEST';
export const FETCH_POST_SUCCESS = 'FETCH_NEWS_ITEM_SUCCESS';
export const FETCH_POST_FAILURE = 'FETCH_NEWS_ITEM_FAILURE';

export const fetchPost = (id) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_POST_REQUEST });

    try {
      const response = api.get(`/feeds/${id}`);

      dispatch({
        type: FETCH_POST_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: FETCH_POST_FAILURE, payload: error });
    }
  };
};
