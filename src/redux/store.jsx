import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";

import authReducer from "./slices/authSlice";


export const store = configureStore({
  reducer: {
    category: categoryReducer,

    auth: authReducer,

  },
});
