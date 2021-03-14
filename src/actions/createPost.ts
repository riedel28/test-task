import { RootState } from '../configureStore';
import { Post } from '../types';
import { FeedAction } from '../reducers/feed';
import { ThunkAction } from 'redux-thunk';

import api from '../api';
import { Dispatch } from 'redux';

export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

type ThunkResult<R> = ThunkAction<R, RootState, undefined, FeedAction>;

export const createPost = (
  post: Pick<Post, 'title' | 'content'>
): ThunkResult<void> => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch({ type: CREATE_POST_REQUEST });

    const token = getState().auth.user?.token;

    try {
      const response = await api.post('/feeds', post, {
        headers: {
          'x-access-token': token
        }
      });

      dispatch({ type: CREATE_POST_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: CREATE_POST_FAILURE, payload: error });
    }
  };
};
