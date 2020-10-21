import api from '../api';
import { Dispatch } from 'redux';
import { FeedAction } from '../reducers/feed';

export const FETCH_FEED_REQUEST = 'FETCH_NEWS_REQUEST';
export const FETCH_FEED_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_FEED_FAILURE = 'FETCH_NEWS_FAILURE';

export const fetchFeed = () => {
  return async (dispatch: Dispatch<FeedAction>) => {
    dispatch({ type: FETCH_FEED_REQUEST });

    try {
      const response = await api.get('/feeds');

      dispatch({ type: FETCH_FEED_SUCCESS, payload: response.data.feeds });
    } catch (error) {
      dispatch({ type: FETCH_FEED_FAILURE, payload: error });
    }
  };
};
