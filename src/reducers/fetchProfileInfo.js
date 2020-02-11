import {
  FETCH_PROFILE_INFO_REQUEST,
  FETCH_PROFILE_INFO_SUCCESS,
  FETCH_PROFILE_INFO_FAILURE,
} from '../actions/fetchUserData';

export const initialState = {
  user: null,
  error: null,
  isLoading: false,
  profileInfo: null,
};

const fetchProfileInfo = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_INFO_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_PROFILE_INFO_SUCCESS:
      const { social } = action.payload;
      const sortedLinks = social.sort((link) =>
        link.label === 'web' ? -1 : 1
      );

      return {
        ...state,
        isLoading: false,
        profileInfo: {
          ...action.payload,
          social: sortedLinks,
        },
      };

    case FETCH_PROFILE_INFO_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default fetchProfileInfo;
