import axiosInstance from "../utils/axios/axiosInstance";
import createToast from "../utils/toast/createToast";

// Action for getting all users
export const getAllUsers = () => (dispatch) => {
  try {
    const response = await axiosInstance.get("/api/admin/get-users");
    console.log(response);
  } catch (err) {
    console.log(err.response);
  }
};
