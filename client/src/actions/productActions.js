import axiosInstance from "../utils/axios/axiosInstance";
import { setErrors } from "./errorActions";
import createToast from "../utils/toast/createToast";
import { CREATE_NEW_PRODUCT, GET_PRODUCTS } from "./types";

// Function to create a new product
export const createNewProduct = (productData, navigate) => async (dispatch) => {
    try {
        const response = await axiosInstance.post("/api/products/create", productData);
        dispatch({
            type: CREATE_NEW_PRODUCT,
            payload: response.data.data.newProduct,
        });
        createToast("New product created", "success");
        navigate("/products");
    } catch (err) {
        dispatch(setErrors(err.response.data));
    }
};

// Function to get all products from DB
export const getProducts = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get("/api/products");
        dispatch({
            type: GET_PRODUCTS,
            payload: response.data.data.products,
        });
    } catch (err) {
        console.log(err);
    }
};

// Function to get a single product
