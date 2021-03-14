import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE
} from '../actions/handleLogin';
import { LOG_OUT } from '../actions/handleLogout';

import { User, Error } from '../types';

export type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: Error | null;
};

export type LoginRequestAction = {
  type: typeof LOG_IN_REQUEST;
};

export type LoginSuccessAction = {
  type: typeof LOG_IN_SUCCESS;
  payload: User;
};

export type LoginFailureAction = {
  type: typeof LOG_IN_FAILURE;
  payload: Error;
};

export type LogoutAction = {
  type: typeof LOG_OUT;
};

export type AuthAction =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction;

export const initialState = {
  user: null,
  isLoggedIn: false,
  error: null,
  isLoading: false
};

const auth = (
  state: AuthState = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case LOG_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload
      };

    case LOG_IN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action.payload
      };

    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        error: null,
        user: null
      };

    default:
      return state;
  }
};

export default auth;
