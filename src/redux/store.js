import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import loginReducer from "./slices/loginSlice";
import registerReducer from "./slices/registerSlice";
import verificationReducer from "./slices/verificationSlice";
import myPageReducer from "./slices/myPageSlice";
import postReducer from "./slices/postSlice";
import commentReducer from "./slices/commentSlice";
import adminPageReducer from "./slices/adminPageSlice";
import favoriteReducer from "./slices/favoriteSlice";
import pwChangeReducer from "./slices/pwChangeSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    login: loginReducer,
    register: registerReducer,
    verification: verificationReducer,
    myPage: myPageReducer,
    post: postReducer,
    comment: commentReducer,
    adminPage: adminPageReducer,
    favorite: favoriteReducer,
    pwChange: pwChangeReducer,
  },
});
