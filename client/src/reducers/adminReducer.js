import _ from "lodash";

import { ADMIN_GET_USERS, ADMIN_GET_USERS_LOADING } from "../actions/types";

const initialState = {
  users: {},
  adminUsersLoading: false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_GET_USERS:
      return {
        ...state,
        users: { ..._.mapKeys(action.payload, "_id") },
        adminUsersLoading: false,
      };
    case ADMIN_GET_USERS_LOADING:
      return {
        ...state,
        adminUsersLoading: true,
      };
    default:
      return state;
  }
};

export default adminReducer;
