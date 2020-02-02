import { SIGN_IN, SIGN_OUT } from '../actions';

export const initialState = {
  user: null,
  isLoggedIn: false,
  error: null,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return action.payload.isLoggedIn === true
        ? {
            ...state,
            isLoggedIn: true,
            error: false,
            user: action.payload.user,
          }
        : { ...state, isLoggedIn: false, error: true };

    case SIGN_OUT:
      return {
        ...state,
        isLoggedIn: false,
        error: null,
      };

    default:
      return state;
  }
};
