import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import api from '../api';
import { FeedAction, FeedState } from '../reducers/feed';

export const FETCH_FEED_REQUEST = 'FETCH_NEWS_REQUEST';
export const FETCH_FEED_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_FEED_FAILURE = 'FETCH_NEWS_FAILURE';

type ThunkResult<R> = ThunkAction<R, FeedState, undefined, FeedAction>;

export const fetchFeed = (): ThunkResult<void> => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_FEED_REQUEST });

    try {
      const response = await api.get('/feeds');

      dispatch({ type: FETCH_FEED_SUCCESS, payload: response.data.feeds });
    } catch (error) {
      dispatch({ type: FETCH_FEED_FAILURE, payload: error });
    }
  };
};
