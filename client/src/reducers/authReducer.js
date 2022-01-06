import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_INFO,
  FAVORITE_PRODUCT,
  SET_CURRENT_USER_LOADING,
  SET_CURRENT_USER_INFO_LOADING,
} from "../actions/types";
import isEmpty from "../utils/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {},
  userLoading: false,
  userInfo: {},
  userInfoLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: isEmpty(action.payload) ? {} : action.payload,
        isAuthenticated: !isEmpty(action.payload),
        userLoading: false,
      };
    case SET_CURRENT_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
        userInfoLoading: false,
      };
    case FAVORITE_PRODUCT:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          favorites: action.payload,
        },
      };
    case SET_CURRENT_USER_LOADING:
      return {
        ...state,
        userLoading: true,
      };

    case SET_CURRENT_USER_INFO_LOADING:
      return {
        ...state,
        userInfoLoading: true,
      };
    default:
      return state;
  }
};

export default authReducer;
