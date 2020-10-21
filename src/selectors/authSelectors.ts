import { RootState } from '../configureStore';

export const getUser = (state: RootState) => {
  return state.auth.user;
};

export const getAuthError = (state: RootState) => {
  return state.auth.error;
};

export const getAuthLoadingStatus = (state: RootState) => {
  return state.auth.isLoading;
};

export const getAuthStatus = (state: RootState) => {
  return state.auth.isLoggedIn;
};
