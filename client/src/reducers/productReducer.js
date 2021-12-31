import { CREATE_NEW_PRODUCT } from "../actions/types";

const initialState = {
    products: [],
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NEW_PRODUCT:
            return { ...state, products: [action.payload, ...state.products] };
        default:
            return state;
    }
};
