import { combineReducers } from "redux";

import authReducer from "./authReducer";
import productReducer from "./productReducer";
import errorReducer from "./errorReducer";
import exchangeReducer from "./exchangeReducer";
import adminReducer from "./adminReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  product: productReducer,
  exchange: exchangeReducer,
  admin: adminReducer,
});
