import api from '../api';

export const FETCH_NEWS_ITEM_REQUEST = 'FETCH_NEWS_ITEM_REQUEST';
export const FETCH_NEWS_ITEM_SUCCESS = 'FETCH_NEWS_ITEM_SUCCESS';
export const FETCH_NEWS_ITEM_FAILURE = 'FETCH_NEWS_ITEM_FAILURE';

export const fetchNewsItem = (id) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_NEWS_ITEM_REQUEST });

    try {
      const response = api.get(`/feeds/${id}`);

      dispatch({
        type: FETCH_NEWS_ITEM_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: FETCH_NEWS_ITEM_FAILURE, payload: error });
    }
  };
};
