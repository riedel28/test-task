import { combineReducers } from 'redux';

import login from './login';
import logout from './logout';
import fetchNews from './fetchNews';
import fetchProfileInfo from './fetchProfileInfo';

const rootReducer = combineReducers({
  login,
  logout,
  fetchProfileInfo,
  fetchNews,
});

export default rootReducer;
