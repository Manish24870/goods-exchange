import axiosInstance from "../utils/axios/axiosInstance";
import { setErrors } from "./errorActions";
import createToast from "../utils/toast/createToast";
import { CREATE_NEW_PRODUCT, GET_PRODUCTS, GET_PRODUCT } from "./types";

// Function to create a new product
export const createNewProduct = (productData, navigate) => async (dispatch) => {
    try {
        const response = await axiosInstance.post("/api/products/create", productData);
        dispatch({
            type: CREATE_NEW_PRODUCT,
            payload: response.data.data.newProduct,
        });
        createToast("New product created", "success");
        navigate("/products", { replace: true });
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
export const getProduct = (id) => async (dispatch) => {
    try {
        const response = await axiosInstance.get(`/api/products/${id}`);
        dispatch({
            type: GET_PRODUCT,
            payload: response.data.data.product,
        });
    } catch (err) {
        console.log(err.response);
    }
};

// Function to post a question
export const createNewQuestion = (questionData) => async (dispatch) => {
    try {
        const response = await axiosInstance.post("/api/products/question", questionData);
        console.log(repsonse);
    } catch (err) {
        console.log(err.response);
    }
};
