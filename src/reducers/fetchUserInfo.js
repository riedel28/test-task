import {
  FETCH_USER_INFO_REQUEST,
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_FAILURE,
} from '../actions';

export const initialState = {
  user: null,
  error: null,
  isLoading: false,
  userInfo: null,
};

const fetchUserInfo = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_INFO_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_USER_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userInfo: action.payload,
      };

    case FETCH_USER_INFO_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default fetchUserInfo;
