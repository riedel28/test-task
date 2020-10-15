import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
} from '../actions/handleLogin';
import { LOG_OUT } from '../actions/handleLogout';
import auth, { initialState } from '../reducers/auth';

describe('Auth reducer', () => {
  test('LOG_IN_REQUEST', () => {
    const action = {
      type: LOG_IN_REQUEST,
    };

    expect(auth(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  test('LOG_IN_SUCCESS', () => {
    const action = {
      type: LOG_IN_SUCCESS,
      payload: {
        _id: 12345,
        name: 'John Doe',
      },
    };

    expect(auth(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      isLoggedIn: true,
      user: {
        _id: 12345,
        name: 'John Doe',
      },
    });
  });

  test('LOG_IN_FAILURE', () => {
    const action = {
      type: LOG_IN_FAILURE,
      payload: {
        message: 'Log in failure',
      },
    };

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
    };

    expect(auth(initialState, action)).toEqual({
      ...initialState,
      isLoggedIn: false,
      error: null,
      user: null,
    });
  });
});
