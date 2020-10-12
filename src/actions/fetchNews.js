import api from '../api';

export const FETCH_NEWS_REQUEST = 'FETCH_NEWS_REQUEST';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_FAILURE = 'FETCH_NEWS_FAILURE';
export const FETCH_USER_INFO_FAILURE = 'FETCH_USER_INFO_FAILURE';

export const fetchNews = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_NEWS_REQUEST });

    try {
      const response = await api.get('/feeds');

      dispatch({ type: FETCH_NEWS_SUCCESS, payload: response.data.feeds });
    } catch (error) {
      dispatch({ type: FETCH_NEWS_FAILURE, payload: error });
    }
  };
};
