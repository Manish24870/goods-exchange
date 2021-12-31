import { SET_ERRORS, CLEAR_ERRORS } from "./types";

// Functions to dispatch error actions
// Set the errors
export const setErrors = (payload) => (dispatch) => {
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
