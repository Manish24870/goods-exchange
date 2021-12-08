import jwt_decode from "jwt-decode";

import axiosInstance from "../utils/axios/axiosInstance";
import setAuthToken from "../utils/auth/setAuthToken";
import createToast from "../utils/toast/createToast";
import { SET_CURRENT_USER, SET_ERRORS, CLEAR_ERRORS } from "./types";

// Action for registering a user
export const registerUser = (userData, navigate) => async (dispatch) => {
    try {
        const response = await axiosInstance.post("/api/auth/register", userData);
        authenticateUser(response, dispatch, navigate);
    } catch (err) {
        dispatch(setErrors(err.response.data));
    }
};

// Action for logging in a user
export const loginUser = (userData, navigate) => async (dispatch) => {
    try {
        const response = await axiosInstance.post("/api/auth/login", userData);
        authenticateUser(response, dispatch, navigate);
    } catch (err) {
        // Show toast message
        const errorData = err.response.data.data;
        createToast(errorData.errors.message, err.response.data.errorType);
        dispatch(setErrors(err.response.data));
    }
};

// Action for logging user out
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("jwt");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    createToast("Logged out successfully", "success");
};

//Function to set logged in users state
const authenticateUser = (response, dispatch, navigate) => {
    // Save token in localstorage
    const token = response.data.data.token;
    localStorage.setItem("jwt", token);

    // Set the token in axios header
    setAuthToken(token);

    // Set the decoded data in redux store
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
    createToast("Login Successful", "success");
    navigate("/", { replace: true });
};

// Disaptch function to set user data in store
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
    };
};

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
