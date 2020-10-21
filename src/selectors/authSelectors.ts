export const getUser = (state: any) => {
  return state.auth.user;
};

export const getAuthError = (state: any) => {
  return state.auth.error;
};

export const getAuthLoadingStatus = (state: any) => {
  return state.auth.isLoading;
};

export const getAuthStatus = (state: any) => {
  return state.auth.isLoggedIn;
};
