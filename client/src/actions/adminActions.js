import axiosInstance from "../utils/axios/axiosInstance";
import createToast from "../utils/toast/createToast";
import {
  ADMIN_GET_USERS,
  ADMIN_GET_USERS_LOADING,
  ADMIN_DELETE_USER,
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
    const response = await axiosInstance.delete(
      `/api/admin/delete-user/${userId}`
    );
    console.log(response);
    dispatch({
      type: ADMIN_DELETE_USER,
      payload: userId,
    });
  } catch (err) {
    console.log(err.response);
  }
};
