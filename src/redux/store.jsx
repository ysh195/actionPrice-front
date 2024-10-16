import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import loginReducer from "./slices/loginSlice";
import registerReducer from "./slices/registerSlice";
import verificationReducer from "./slices/verificationSlice";


export const store = configureStore({
  reducer: {
    category: categoryReducer,
    login: loginReducer,
    register: registerReducer,
    verification: verificationReducer,
  },
});
