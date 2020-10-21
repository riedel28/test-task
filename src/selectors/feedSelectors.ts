import { RootState } from '../configureStore';

export const getFeedPosts = (state: RootState) => {
  return state.feed.posts;
};

export const getFeedError = (state: RootState) => {
  return state.feed.error;
};

export const getFeedLoadingStatus = (state: RootState) => {
  return state.feed.isLoading;
};
