import { SET_CURRENT_USER, SET_CURRENT_USER_INFO, FAVORITE_PRODUCT } from "../actions/types";
import isEmpty from "../utils/isEmpty";

const initialState = {
    isAuthenticated: false,
    user: {},
    userInfo: {},
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                user: isEmpty(action.payload) ? {} : action.payload,
                isAuthenticated: !isEmpty(action.payload),
            };
        case SET_CURRENT_USER_INFO:
            return {
                ...state,
                userInfo: action.payload,
            };
        case FAVORITE_PRODUCT:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    favorites: action.payload,
                },
            };
        default:
            return state;
    }
};

export default authReducer;
