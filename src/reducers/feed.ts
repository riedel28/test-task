import {
  FETCH_FEED_REQUEST,
  FETCH_FEED_SUCCESS,
  FETCH_FEED_FAILURE,
} from '../actions/fetchFeed';
import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
} from '../actions/createPost';
import {
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
} from '../actions/deletePost';
import {
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAILURE,
} from '../actions/editPost';

import { Post, Error } from '../types';

export type FeedState = {
  posts: Array<Post>,
  isLoading: boolean,
  error?: Error | null,
};

export type FetchFeedRequestAction = {
  type: typeof FETCH_FEED_REQUEST,
};

export type FetchFeedSuccessAction = {
  type: typeof FETCH_FEED_SUCCESS,
  payload: Array<Post>,
};

export type FetchFeedFailureAction = {
  type: typeof FETCH_FEED_FAILURE,
  payload: Error,
};

export type CreatePostRequestAction = {
  type: typeof CREATE_POST_REQUEST,
};

export type CreatePostSuccessAction = {
  type: typeof CREATE_POST_SUCCESS,
  payload: { feed: Post },
};

export type CreatePostFailureAction = {
  type: typeof CREATE_POST_FAILURE,
  payload: Error,
};

export type EditPostRequestAction = {
  type: typeof EDIT_POST_REQUEST,
};

export type EditPostSuccessAction = {
  type: typeof EDIT_POST_SUCCESS,
  payload: Post,
};

export type EditPostFailureAction = {
  type: typeof EDIT_POST_FAILURE,
  payload: Error,
};

export type DeletePostRequestAction = {
  type: typeof DELETE_POST_REQUEST,
};

export type DeletePostSuccessAction = {
  type: typeof DELETE_POST_SUCCESS,
  payload: { _id: string },
};

export type DeletePostFailureAction = {
  type: typeof DELETE_POST_FAILURE,
  payload: Error,
};

export type FeedAction =
  | FetchFeedRequestAction
  | FetchFeedSuccessAction
  | FetchFeedFailureAction
  | CreatePostRequestAction
  | CreatePostSuccessAction
  | CreatePostFailureAction
  | EditPostRequestAction
  | EditPostSuccessAction
  | EditPostFailureAction
  | DeletePostRequestAction
  | DeletePostSuccessAction
  | DeletePostFailureAction;

export const initialState = {
  error: null,
  isLoading: false,
  posts: [],
};

const news = (state: FeedState = initialState, action: FeedAction) => {
  switch (action.type) {
    case FETCH_FEED_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case FETCH_FEED_SUCCESS:
      const newPosts = action.payload.sort((a: any, b: any) => {
        return Number(new Date(b.createDate)) - Number(new Date(a.createDate));
      });

      return {
        ...state,
        isLoading: false,
        posts: newPosts,
      };

    case FETCH_FEED_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case CREATE_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: [action.payload.feed, ...state.posts],
      };

    case CREATE_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case EDIT_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case EDIT_POST_SUCCESS:
      const { _id } = action.payload;

      return {
        ...state,
        isLoading: false,
        posts: state.posts.map((post: any) => {
          if (post._id === _id) {
            return action.payload;
          }

          return post;
        }),
      };

    case EDIT_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case DELETE_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: state.posts.filter(
          (post: any) => post._id !== action.payload._id
        ),
      };

    case DELETE_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default news;
