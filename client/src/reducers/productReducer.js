import _ from "lodash";

import {
  CREATE_NEW_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT,
  CREATE_NEW_QUESTION,
  CREATE_NEW_ANSWER,
  SET_PRODUCTS_LOADING,
} from "../actions/types";

const initialState = {
  products: {},
  product: {},
  productsLoading: false,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_PRODUCT:
      return {
        ...state,
        products: { [action.payload._id]: action.payload, ...state.products },
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: { ..._.mapKeys(action.payload, "_id") },
        productsLoading: false,
      };
    case SET_PRODUCTS_LOADING: {
      return {
        ...state,
        productsLoading: true,
      };
    }
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case CREATE_NEW_QUESTION:
      return {
        ...state,
        product: { ...state.product, questions: action.payload },
      };
    case CREATE_NEW_ANSWER:
      return {
        ...state,
        product: { ...state.product, questions: action.payload },
      };
    default:
      return state;
  }
};

export default productReducer;
