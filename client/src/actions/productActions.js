import axiosInstance from "../utils/axios/axiosInstance";

export const createNewProduct = (productData) => async (dispatch) => {
    try {
        const response = await axiosInstance.post("/api/product/create", productData);
        console.log(productData);
    } catch (err) {
        console.log(err.response);
    }
};
