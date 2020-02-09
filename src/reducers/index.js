import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT,
  FETCH_USER_INFO_REQUEST,
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_FAILURE,
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE,
} from '../actions';

export const initialState = {
  user: null,
  isLoggedIn: false,
  error: null,
  isLoading: false,
  userInfo: null,
  news: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload,
      };

    case SIGN_IN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action.payload,
      };

    case SIGN_OUT:
      return {
        ...state,
        isLoggedIn: false,
        error: null,
        user: null,
        userInfo: null,
      };

    case FETCH_USER_INFO_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_USER_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userInfo: action.payload,
      };

    case FETCH_USER_INFO_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

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

    default:
      return state;
  }
};
