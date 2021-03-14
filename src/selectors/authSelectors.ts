import { RootState } from '../configureStore';

import { User, Error } from '../types';

export const getUser = (state: RootState): User | null => {
  return state.auth.user;
};

export const getAuthError = (state: RootState): Error | null => {
  return state.auth.error;
};

export const getAuthLoadingStatus = (state: RootState): boolean => {
  return state.auth.isLoading;
};

export const getAuthStatus = (state: RootState): boolean => {
  return state.auth.isLoggedIn;
};
