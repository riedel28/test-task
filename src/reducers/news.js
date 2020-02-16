import {
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE,
} from '../actions/fetchNews';
import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
} from '../actions/createPost';

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
        news: action.payload,
      };

    case FETCH_NEWS_FAILURE:
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
        news: [...state.news, action.payload],
      };

    case CREATE_POST_FAILURE:
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
