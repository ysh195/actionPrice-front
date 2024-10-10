import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";

import authReducer from "./slices/authSlice";
import loginReducer from "./slices/loginSlice";
import registerReducer from "./slices/registerSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    login: loginReducer,
    register: registerReducer,
    auth: authReducer,
  },
});
