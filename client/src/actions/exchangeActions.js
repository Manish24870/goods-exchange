import axiosInstance from "../utils/axios/axiosInstance";
import { GET_MY_PRODUCTS, SET_MY_PRODUCTS_LOADING } from "./types";
// import createToast from "../utils/toast/createToast";

export const createNewExchange = (exchangeData) => async (dispatch) => {
    try {
        const response = await axiosInstance.post("/api/exchange/create", exchangeData);
        console.log(response);
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

// Function to dispatch action for loading state
const setMyProductsLoading = () => {
    return {
        type: SET_MY_PRODUCTS_LOADING,
    };
};
