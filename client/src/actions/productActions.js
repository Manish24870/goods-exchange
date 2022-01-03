import axiosInstance from "../utils/axios/axiosInstance";
import { clearErrors, setErrors } from "./errorActions";
import createToast from "../utils/toast/createToast";
import {
    CREATE_NEW_PRODUCT,
    GET_PRODUCTS,
    GET_PRODUCT,
    CREATE_NEW_QUESTION,
    CREATE_NEW_ANSWER,
    FAVORITE_PRODUCT,
    SET_PRODUCTS_LOADING,
} from "./types";

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
    dispatch(setProductsLoading());
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
export const createNewQuestion = (id, questionData, setFormData) => async (dispatch) => {
    try {
        const response = await axiosInstance.post(`/api/products/${id}/question`, questionData);
        dispatch(clearErrors());
        dispatch({
            type: CREATE_NEW_QUESTION,
            payload: response.data.data.product.questions,
        });
        createToast("Question added", "success");
        setFormData({ question: "" });
    } catch (err) {
        dispatch(setErrors(err.response.data));
    }
};

// Function to post a question
export const createNewAnswer = (id, questionId, answerData, handleClose) => async (dispatch) => {
    try {
        const response = await axiosInstance.post(
            `/api/products/${id}/${questionId}/answer`,
            answerData
        );
        dispatch(clearErrors());
        dispatch({
            type: CREATE_NEW_ANSWER,
            payload: response.data.data.product.questions,
        });
        // Function to close the dialog box
        handleClose();
    } catch (err) {
        dispatch(setErrors(err.response.data));
    }
};

// Function to favorite a product
export const favoriteProduct = (favoriteDetails) => async (dispatch) => {
    try {
        const response = await axiosInstance.post("/api/products/favorite", favoriteDetails);
        createToast(response.data.data.message, "success");
        dispatch({
            type: FAVORITE_PRODUCT,
            payload: response.data.data.user.favorites,
        });
    } catch (err) {
        dispatch(setErrors(err.response.data));
    }
};

// Function to set loading while fetching products
const setProductsLoading = () => {
    return {
        type: SET_PRODUCTS_LOADING,
    };
};
