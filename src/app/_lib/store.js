import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categoryReducer'; 
import genericReducer from './genericReducer';
import sessionReducer from "../_lib/sessionReducer";
import utilReducer from "../_lib/utilReducer";
import productReducer from "./productReducer";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
export const makeStore = () => {
  return configureStore({
    reducer: {
      categories: categoryReducer, 
      generic:genericReducer,
      session: sessionReducer,
      utils:utilReducer,
      userData:userReducer,
      product:productReducer,
      cart:cartReducer,
    },
  });
};
