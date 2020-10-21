import api from '../api';
import { Dispatch } from 'redux';
import { RootState } from '../configureStore';
import { Post } from '../types';
import { FeedAction } from '../reducers/feed';

export const EDIT_POST_REQUEST = 'EDIT_POST_REQUEST';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE';

export const editPost = (id: string, post: Pick<Post, 'title' | 'content'>) => {
  return async (dispatch: Dispatch<FeedAction>, getState: () => RootState) => {
    dispatch({ type: EDIT_POST_REQUEST });

    const token = getState().auth.user!.token;

    try {
      const response = await api.put(`/feeds/${id}`, post, {
        headers: {
          'x-access-token': token,
        },
      });

      dispatch({ type: EDIT_POST_SUCCESS, payload: response.data.feed });
    } catch (error) {
      dispatch({ type: EDIT_POST_FAILURE, payload: error });
    }
  };
};
