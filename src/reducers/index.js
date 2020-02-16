import { combineReducers } from 'redux';

import auth from './auth';
import news from './news';
import fetchProfileInfo from './fetchProfileInfo';

const rootReducer = combineReducers({
  auth,
  fetchProfileInfo,
  news,
});

export default rootReducer;
