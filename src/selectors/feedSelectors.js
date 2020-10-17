export const getFeedPosts = (state) => {
  return state.feed.posts;
};

export const getFeedError = (state) => {
  return state.feed.error;
};

export const getFeedLoadingStatus = (state) => {
  return state.feed.isLoading;
};
