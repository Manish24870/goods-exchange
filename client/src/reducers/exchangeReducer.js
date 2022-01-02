import _ from "lodash";

import { GET_MY_PRODUCTS, SET_MY_PRODUCTS_LOADING } from "../actions/types";

const initialState = {
    myProducts: {},
    loadingMyProducts: false,
};

const exchangeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MY_PRODUCTS:
            return {
                ...state,
                myProducts: { ..._.mapKeys(action.payload, "_id") },
                loadingMyProducts: false,
            };
        case SET_MY_PRODUCTS_LOADING:
            return {
                ...state,
                loadingMyProducts: true,
            };
        default:
            return state;
    }
};

export default exchangeReducer;
