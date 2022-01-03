import _ from "lodash";

import {
    GET_MY_PRODUCTS,
    SET_MY_PRODUCTS_LOADING,
    GET_MY_INITIATES,
    GET_MY_FAVORITES,
    SET_MY_FAVORITES_LOADING,
} from "../actions/types";

const initialState = {
    myProducts: {},
    myFavorites: [],
    myInitiates: [],
    myProductsLoading: false,
    myFavoritesLoading: false,
};

const exchangeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MY_PRODUCTS:
            return {
                ...state,
                myProducts: { ..._.mapKeys(action.payload, "_id") },
                myProductsLoading: false,
            };
        case GET_MY_INITIATES:
            return {
                ...state,
                myInitiates: action.payload,
            };
        case SET_MY_PRODUCTS_LOADING:
            return {
                ...state,
                myProductsLoading: true,
            };
        case GET_MY_FAVORITES:
            return {
                ...state,
                myFavorites: action.payload,
                myFavoritesLoading: false,
            };

        case SET_MY_FAVORITES_LOADING:
            return {
                ...state,
                myFavoritesLoading: true,
            };
        default:
            return state;
    }
};

export default exchangeReducer;
