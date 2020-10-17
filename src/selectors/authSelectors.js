export const getUser = (state) => {
  return state.auth.user;
};

export const getAuthError = (state) => {
  return state.auth.error;
};

export const getAuthLoadingStatus = (state) => {
  return state.auth.isLoading;
};

export const getAuthStatus = (state) => {
  return state.auth.isLoggedIn;
};
