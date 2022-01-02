import _ from "lodash";

import { GET_MY_PRODUCTS, SET_MY_PRODUCTS_LOADING, GET_MY_INITIATES } from "../actions/types";

const initialState = {
    myProducts: {},
    myInitiates: [],
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
        case GET_MY_INITIATES:
            return {
                ...state,
                myInitiates: action.payload,
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
