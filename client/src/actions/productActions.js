import axiosInstance from "../utils/axios/axiosInstance";

export const createNewProduct = (productData) => async (dispatch) => {
    try {
        const response = await axiosInstance.post("/api/products/create", productData);
        console.log(response);
    } catch (err) {
        console.log(err.response.data);
    }
};
