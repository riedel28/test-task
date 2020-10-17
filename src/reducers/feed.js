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

export const initialState = {
  error: null,
  isLoading: false,
  posts: [],
};

const news = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FEED_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case FETCH_FEED_SUCCESS:
      const newPosts = action.payload.sort((a, b) => {
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
        posts: state.posts.map((post) => {
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
        posts: state.posts.filter((post) => post._id !== action.payload._id),
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
