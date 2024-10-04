import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {

    category: categoryReducer,

    user: userReducer,
  },
});

