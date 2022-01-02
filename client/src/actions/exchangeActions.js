import axiosInstance from "../utils/axios/axiosInstance";
import { GET_MY_PRODUCTS } from "./types";
// import { setErrors} from "./errorActions";
// import createToast from "../utils/toast/createToast";

export const createNewExchange = (productWanted) => async (dispatch) => {
    try {
        const response = await axiosInstance.post(`/api/exchange/create`);
        console.log(response);
    } catch (err) {
        console.log(err);
    }
};

// Function to get my products
export const getMyProducts = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get("/api/exchange/my-products");
        console.log(response.data);
        dispatch({
            type: GET_MY_PRODUCTS,
            payload: response.data.data.myProducts,
        });
    } catch (err) {
        console.log(err);
    }
};
