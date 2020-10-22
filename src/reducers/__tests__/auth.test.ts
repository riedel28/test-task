import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
} from '../../actions/handleLogin';
import { LOG_OUT } from '../../actions/handleLogout';
import auth, {
  initialState,
  LoginSuccessAction,
  LoginRequestAction,
  LoginFailureAction,
  LogoutAction,
} from '../auth';

describe('Auth reducer', () => {
  test('LOG_IN_REQUEST', () => {
    const action = {
      type: LOG_IN_REQUEST,
    } as LoginRequestAction;

    expect(auth(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  test('LOG_IN_SUCCESS', () => {
    const action = {
      type: LOG_IN_SUCCESS,
      payload: {
        name: 'John Doe',
        token: ''
      },
    } as LoginSuccessAction;

    expect(auth(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      isLoggedIn: true,
      user: {
        name: 'John Doe',
        token: ''
      },
    });
  });

  test('LOG_IN_FAILURE', () => {
    const action = {
      type: LOG_IN_FAILURE,
      payload: {
        message: 'Log in failure',
      },
    } as LoginFailureAction;

    expect(auth(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      isLoggedIn: false,
      error: {
        message: 'Log in failure',
      },
    });
  });

  test('LOG_OUT', () => {
    const action = {
      type: LOG_OUT,
      payload: {
        message: 'Log in failure',
      },
    } as LogoutAction;

    expect(auth(initialState, action)).toEqual({
      ...initialState,
      isLoggedIn: false,
      error: null,
      user: null,
    });
  });
});
