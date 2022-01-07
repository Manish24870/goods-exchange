import _ from "lodash";

import {
  ADMIN_GET_USERS,
  ADMIN_GET_USERS_LOADING,
  ADMIN_GET_PRODUCTS,
  ADMIN_GET_PRODUCTS_LOADING,
  ADMIN_DELETE_USER,
  ADMIN_PROMOTE_USER,
  ADMIN_DEMOTE_USER,
} from "../actions/types";

const initialState = {
  adminUsers: {},
  adminProducts: {},
  adminUsersLoading: false,
  adminProductsLoading: false,
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
    case ADMIN_GET_PRODUCTS:
      return {
        ...state,
        adminProducts: { ..._.mapKeys(action.payload, "_id") },
        adminProductsLoading: false,
      };
    case ADMIN_GET_PRODUCTS_LOADING:
      return {
        ...state,
        adminProductsLoading: true,
      };
    case ADMIN_DELETE_USER:
      return {
        ...state,
        adminUsers: _.omit(state.adminUsers, action.payload),
      };
    case ADMIN_PROMOTE_USER:
      return {
        ...state,
        adminUsers: {
          ...state.adminUsers,
          [action.payload._id]: action.payload,
        },
      };
    case ADMIN_DEMOTE_USER:
      return {
        ...state,
        adminUsers: {
          ...state.adminUsers,
          [action.payload._id]: action.payload,
        },
      };
    default:
      return state;
  }
};

export default adminReducer;
