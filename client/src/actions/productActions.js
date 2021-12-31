import axiosInstance from "../utils/axios/axiosInstance";
import { setErrors } from "./errorActions";
import createToast from "../utils/toast/createToast";
import { CREATE_NEW_PRODUCT } from "./types";

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
