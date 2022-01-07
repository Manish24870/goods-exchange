import axiosInstance from "../utils/axios/axiosInstance";
import createToast from "../utils/toast/createToast";
import { setErrors } from "./errorActions";
import {
  ADMIN_GET_USERS,
  ADMIN_GET_USERS_LOADING,
  ADMIN_GET_PRODUCTS,
  ADMIN_GET_PRODUCTS_LOADING,
  ADMIN_DELETE_USER,
  ADMIN_PROMOTE_USER,
  ADMIN_DEMOTE_USER,
} from "./types";

// Action for getting all users
export const adminGetAllUsers = () => async (dispatch) => {
  dispatch(setAdminUsersLoading());
  try {
    const response = await axiosInstance.get("/api/admin/get-users");
    dispatch({
      type: ADMIN_GET_USERS,
      payload: response.data.data.users,
    });
  } catch (err) {
    console.log(err.response);
  }
};

const setAdminUsersLoading = () => {
  return {
    type: ADMIN_GET_USERS_LOADING,
  };
};

// Action for deleting a user
export const adminDeleteUser = (userId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/api/admin/delete-user/${userId}`);
    createToast("User deleted", "success");
    dispatch({
      type: ADMIN_DELETE_USER,
      payload: userId,
    });
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};

// Action for promoting a user
export const adminPromoteUser = (userId) => async (dispatch) => {
  try {
    const response = await axiosInstance.patch(`/api/admin/promote-user/`, {
      userId,
    });
    createToast("User promoted", "success");
    dispatch({
      type: ADMIN_PROMOTE_USER,
      payload: response.data.data.promotedUser,
    });
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};

// Action for demoting a user
export const adminDemoteUser = (userId) => async (dispatch) => {
  try {
    const response = await axiosInstance.patch(`/api/admin/demote-user/`, {
      userId,
    });

    createToast("User demoted", "success");
    dispatch({
      type: ADMIN_DEMOTE_USER,
      payload: response.data.data.demotedUser,
    });
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};

// Action for getting all products
export const adminGetAllProducts = () => async (dispatch) => {
  dispatch(setAdminProductsLoading());
  try {
    const response = await axiosInstance.get("/api/admin/get-products");
    dispatch({
      type: ADMIN_GET_PRODUCTS,
      payload: response.data.data.products,
    });
  } catch (err) {
    console.log(err.response);
  }
};

const setAdminProductsLoading = () => {
  return {
    type: ADMIN_GET_PRODUCTS_LOADING,
  };
};
