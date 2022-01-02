import axiosInstance from "../utils/axios/axiosInstance";
import { GET_MY_PRODUCTS, SET_MY_PRODUCTS_LOADING, GET_MY_INITIATES } from "./types";
import { setErrors } from "./errorActions";
import createToast from "../utils/toast/createToast";

// Function to initiate or cancel an exchange
export const createNewExchange =
    (exchangeData, handleClose = null) =>
    async (dispatch) => {
        try {
            await axiosInstance.post("/api/exchange/create", exchangeData);
            dispatch(getMyInitiates());
            if (Object.keys(exchangeData).length === 3) {
                createToast("Exchange Initiated", "success");
                handleClose();
            } else {
                createToast("Exchange cancelled", "success");
            }
        } catch (err) {
            console.log(err);
        }
    };

// Function to get my products
export const getMyProducts = () => async (dispatch) => {
    dispatch(setMyProductsLoading());
    try {
        const response = await axiosInstance.get("/api/exchange/my-products");
        dispatch({
            type: GET_MY_PRODUCTS,
            payload: response.data.data.myProducts,
        });
    } catch (err) {
        console.log(err);
    }
};

// Function to get my exchange initiates
export const getMyInitiates = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get("/api/exchange/my-initiates");
        dispatch({
            type: GET_MY_INITIATES,
            payload: response.data.data.myInitiates,
        });
    } catch (err) {
        dispatch(setErrors(err.response.data));
    }
};

// Function to dispatch action for loading state
const setMyProductsLoading = () => {
    return {
        type: SET_MY_PRODUCTS_LOADING,
    };
};
