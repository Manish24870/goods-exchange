import jwt_decode from "jwt-decode";

import axiosInstance from "../utils/axios/axiosInstance";
import setAuthToken from "../utils/auth/setAuthToken";
import { SET_CURRENT_USER, SET_ERRORS, CLEAR_ERRORS } from "./types";

// Action for registering a user
export const registerUser = (userData, navigate) => async (dispatch) => {
    try {
        const response = await axiosInstance.post("/api/auth/register", userData);
        authenticateUser(response, dispatch, navigate);
    } catch (err) {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data,
        });
    }
};

// Action for logging in a user
export const loginUser = (userData, navigate) => async (dispatch) => {
    try {
        const response = await axiosInstance.post("/api/auth/login", userData);
        authenticateUser(response, dispatch, navigate);
    } catch (err) {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data,
        });
    }
};

// Clear errors wwhile component unmounts
export const clearErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};

// Disaptch function to set user data in store
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
    };
};

//Function to set logged in users state
const authenticateUser = (response, dispatch, navigate) => {
    const token = response.data.data.token;
    localStorage.setItem("jwt", token);
    setAuthToken(token);

    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
    navigate("/", { replace: true });
};
