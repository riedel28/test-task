import rootApiUrl from './../helpers/rootApiUrl.js';

export const FETCH_NEWS_REQUEST = 'FETCH_NEWS_REQUEST';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_FAILURE = 'FETCH_NEWS_FAILURE';
export const FETCH_USER_INFO_FAILURE = 'FETCH_USER_INFO_FAILURE';

export const fetchNews = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_NEWS_REQUEST });

      const response = await fetch(`${rootApiUrl}/news`);
      const json = await response.json();

      if (json.status === 'ok') {
        dispatch({ type: FETCH_NEWS_SUCCESS, payload: json.data });
      }

      if (json.status === 'err') {
        dispatch({
          type: FETCH_USER_INFO_FAILURE,
          payload: json.message,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_USER_INFO_FAILURE,
        payload: error.message || 'Something went wrong',
      });
    }
  };
};
