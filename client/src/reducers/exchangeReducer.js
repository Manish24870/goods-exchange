import _ from "lodash";

import {
    GET_MY_PRODUCTS,
    GET_MY_FAVORITES,
    GET_MY_INITIATES,
    GET_MY_OFFERS,
    SET_MY_PRODUCTS_LOADING,
    SET_MY_FAVORITES_LOADING,
    SET_MY_INITIATES_LOADING,
    SET_MY_OFFERS_LOADING,
} from "../actions/types";

const initialState = {
    myProducts: {},
    myFavorites: [],
    myInitiates: [],
    myOffers: [],
    myProductsLoading: false,
    myFavoritesLoading: false,
    myInitiatesLoading: false,
    myOffersLoading: false,
};

const exchangeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MY_PRODUCTS:
            return {
                ...state,
                myProducts: { ..._.mapKeys(action.payload, "_id") },
                myProductsLoading: false,
            };
        case SET_MY_PRODUCTS_LOADING:
            return {
                ...state,
                myProductsLoading: true,
            };
        case GET_MY_INITIATES:
            return {
                ...state,
                myInitiates: action.payload,
                myInitiatesLoading: false,
            };
        case SET_MY_INITIATES_LOADING:
            return {
                ...state,
                myInitiatesLoading: true,
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
        case GET_MY_OFFERS:
            return {
                ...state,
                myOffers: action.payload,
                myOffersLoading: false,
            };
        case SET_MY_OFFERS_LOADING:
            return {
                ...state,
                myOffersLoading: true,
            };
        default:
            return state;
    }
};

export default exchangeReducer;
