import { combineReducers } from 'redux';

import auth from './auth';
import news from './news';

const rootReducer = combineReducers({
  auth,
  news,
});

export default rootReducer;
