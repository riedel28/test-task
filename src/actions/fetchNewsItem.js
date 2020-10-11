import axios from 'axios';
import rootApiUrl from './../helpers/rootApiUrl.js';

export const FETCH_NEWS_ITEM_REQUEST = 'FETCH_NEWS_ITEM_REQUEST';
export const FETCH_NEWS_ITEM_SUCCESS = 'FETCH_NEWS_ITEM_SUCCESS';
export const FETCH_NEWS_ITEM_FAILURE = 'FETCH_NEWS_ITEM_FAILURE';

export const fetchNewsItem = (id) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_NEWS_ITEM_REQUEST });

    try {
      const response = axios.get(`${rootApiUrl}/feeds/${id}`);

      dispatch({
        type: FETCH_NEWS_ITEM_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: FETCH_NEWS_ITEM_FAILURE, payload: error });
    }
  };
};
