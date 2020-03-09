import {
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE,
} from '../actions/fetchNews';
import {
  FETCH_NEWS_ITEM_REQUEST,
  FETCH_NEWS_ITEM_SUCCESS,
  FETCH_NEWS_ITEM_FAILURE,
} from '../actions/fetchNewsItem';
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
  news: [],
};

const news = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_NEWS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        news: [...action.payload],
      };

    case FETCH_NEWS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case FETCH_NEWS_ITEM_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_NEWS_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentPost: action.payload.feed,
      };

    case FETCH_NEWS_ITEM_FAILURE:
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
        news: [...state.news, action.payload.feed],
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
        news: state.news.map((post) => {
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
        news: state.news.filter((post) => post._id !== action.payload._id),
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
