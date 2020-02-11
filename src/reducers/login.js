import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
} from '../actions/handleLogin';

export const initialState = {
  user: null,
  isLoggedIn: false,
  error: null,
  isLoading: false,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case LOG_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload,
      };

    case LOG_IN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default login;
