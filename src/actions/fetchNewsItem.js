import axios from 'axios';
import rootApiUrl from './../helpers/rootApiUrl.js';

export const FETCH_NEWS_ITEM_REQUEST = 'FETCH_NEWS_REQUEST';
export const FETCH_NEWS_ITEM_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_ITEM_FAILURE = 'FETCH_NEWS_FAILURE';

export const fetchNewsItem = (id) => {
  return async (dispatch) => {
    // try {
    //   dispatch({ type: FETCH_NEWS_REQUEST });

    //   const response = await fetch(`${rootApiUrl}/feeds`);
    //   const json = await response.json();

    //   dispatch({ type: FETCH_NEWS_SUCCESS, payload: json.feeds });
    // } catch (error) {
    //   dispatch({
    //     type: FETCH_USER_INFO_FAILURE,
    //     payload: error.message || 'Something went wrong',
    //   });
    // }

    dispatch({ type: FETCH_NEWS_ITEM_REQUEST });

    axios
      .get(`${rootApiUrl}/feeds/${id}`)
      .then((response) => {
        console.log(response.data.feed);
        dispatch({
          type: FETCH_NEWS_ITEM_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_NEWS_ITEM_FAILURE, payload: error });
      });
  };
};
