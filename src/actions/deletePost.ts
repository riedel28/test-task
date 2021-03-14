import { Dispatch } from 'redux';
import { RootState } from '../configureStore';
import { FeedAction } from '../reducers/feed';
import { ThunkAction } from 'redux-thunk';

import api from '../api';

export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

type ThunkResult<R> = ThunkAction<R, RootState, undefined, FeedAction>;

export const deletePost = (id: string): ThunkResult<void> => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch({ type: DELETE_POST_REQUEST });

    const token = getState().auth.user?.token;

    try {
      const response = await api.delete(`/feeds/${id}`, {
        headers: {
          'x-access-token': token
        }
      });

      dispatch({ type: DELETE_POST_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: DELETE_POST_FAILURE, payload: error });
    }
  };
};
