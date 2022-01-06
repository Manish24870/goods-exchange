import _ from "lodash";

import {
  ADMIN_GET_USERS,
  ADMIN_GET_USERS_LOADING,
  ADMIN_DELETE_USER,
} from "../actions/types";

const initialState = {
  adminUsers: {},
  adminUsersLoading: false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_GET_USERS:
      return {
        ...state,
        adminUsers: { ..._.mapKeys(action.payload, "_id") },
        adminUsersLoading: false,
      };
    case ADMIN_GET_USERS_LOADING:
      return {
        ...state,
        adminUsersLoading: true,
      };
    case ADMIN_DELETE_USER:
      return {
        ...state,
        adminUsers: _.omit(state.adminUsers, action.payload),
      };
    default:
      return state;
  }
};

export default adminReducer;
