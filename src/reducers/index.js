import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT,
} from '../actions';

export const initialState = {
  user: null,
  isLoggedIn: false,
  error: null,
  isLoading: false,
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
      };

    default:
      return state;
  }
};
