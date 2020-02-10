import { combineReducers } from 'redux';

import login from './login';
import logout from './logout';
import fetchNews from './fetchNews';
import fetchUserInfo from './fetchUserInfo';

const rootReducer = combineReducers({
  login,
  logout,
  fetchUserInfo,
  fetchNews,
});

export default rootReducer;
