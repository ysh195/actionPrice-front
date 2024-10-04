/* eslint-disable no-empty-pattern */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  loading: false,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory(state, action){
      state.categories = action.payload;
    }
  },

});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;
