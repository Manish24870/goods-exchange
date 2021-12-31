import { CREATE_NEW_PRODUCT, GET_PRODUCTS } from "../actions/types";

const initialState = {
    products: [],
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NEW_PRODUCT:
            return { ...state, products: [action.payload, ...state.products] };
        case GET_PRODUCTS:
            return { ...state, products: action.payload };
        default:
            return state;
    }
};

export default productReducer;
