import axiosInstance from "../utils/axios/axiosInstance";
import createToast from "../utils/toast/createToast";
import { ADMIN_GET_USERS, ADMIN_GET_USERS_LOADING } from "./types";

// Action for getting all users
export const getAllUsers = () => async (dispatch) => {
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
