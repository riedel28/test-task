import { combineReducers } from 'redux';

import auth from './auth';
import fetchNews from './fetchNews';
import fetchProfileInfo from './fetchProfileInfo';

const rootReducer = combineReducers({
  auth,
  fetchProfileInfo,
  fetchNews,
});

export default rootReducer;
