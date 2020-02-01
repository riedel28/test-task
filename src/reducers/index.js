import { LOG_IN } from '../actions';

export const initialState = {
  isLoggedIn: false,
  error: null,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return action.payload === true
        ? { ...state, isLoggedIn: true, error: false }
        : { ...state, isLoggedIn: false, error: true };

    default:
      return state;
  }
};
