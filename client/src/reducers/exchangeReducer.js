import _ from "lodash";

import { GET_MY_PRODUCTS } from "../actions/types";

const initialState = {
    myProducts: {},
};

const exchangeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MY_PRODUCTS:
            return {
                ...state,
                myProducts: { ..._.mapKeys(action.payload, "_id") },
            };
        default:
            return state;
    }
};

export default exchangeReducer;
