import createToast from "../utils/toast/createToast";
import { SET_ERRORS, CLEAR_ERRORS } from "./types";

// Functions to dispatch error actions
// Set the errors
export const setErrors = (payload) => (dispatch) => {
  // Check if the user is not logged in
  if (
    payload.errorType === "unauthorized-error" ||
    payload.errorType === "already-exchanged-error" ||
    payload.errorType === "already-reviewed-error" ||
    payload.errorType === "already-reported-error"
  ) {
    createToast(payload.data.errors.message, "error");
  }

  dispatch({
    type: SET_ERRORS,
    payload,
  });
};

// Clear errors while component unmounts
export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
