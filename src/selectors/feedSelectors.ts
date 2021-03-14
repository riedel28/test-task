import { RootState } from '../configureStore';

import { Post, Error } from '../types';

export const getFeedPosts = (state: RootState): Post[] => {
  return state.feed.posts;
};

export const getFeedError = (state: RootState): Error | null => {
  return state.feed.error;
};

export const getFeedLoadingStatus = (state: RootState): boolean => {
  return state.feed.isLoading;
};
