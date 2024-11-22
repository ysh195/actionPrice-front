import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import loginReducer from "./slices/loginSlice";
import myPageReducer from "./slices/myPageSlice";
import commentReducer from "./slices/commentSlice";
import favoriteReducer from "./slices/favoriteSlice";
import postReducer from "./slices/postSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    login: loginReducer,
    myPage: myPageReducer,
    post: postReducer,
    comment: commentReducer,
    favorite: favoriteReducer,
  },
});

export default store;
