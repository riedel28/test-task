import { LOG_OUT } from '../actions/handleLogout';

export const initialState = {
  isLoggedIn: false,
};

const logout = (state = initialState, action) => {
  switch (action.type) {
    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        error: null,
        user: null,
        userInfo: null,
      };

    default:
      return state;
  }
};

export default logout;
