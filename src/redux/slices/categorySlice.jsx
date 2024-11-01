/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  middleCategoryList: [],
  smallCategoryList: [],
  rankCategoryList: [],
  dataList: [],
  selectedMiddle: "",
  selectedSmall: "",
  selectedRank: "",
  loading: false,
  error: "",
};

const BASE_URL = "http://localhost:8080/api";

//function: Get Middle Category List //
export const fetchMiddleCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (large) => {
    const encodedLarge = encodeURIComponent(large);
    const response = await axios.get(`${BASE_URL}/category/${encodedLarge}`);
    console.log("fetchMiddleCategories:", response.data);
    return response.data; // Assuming this returns an array of large categories
  }
);
//function: Get Small Category List //
// Async thunk for fetching middle categories based on selected large category
export const fetchSmallCategories = createAsyncThunk(
  "categories/fetchMiddleCategories",
  async ({ large, middle }) => {
    const encodedLarge = encodeURIComponent(large);
    const encodedMiddle = encodeURIComponent(middle);
    const response = await axios.get(
      `${BASE_URL}/category/${encodedLarge}/${encodedMiddle}`
    );
    console.log("fetchSmallCategories:", response.data);

    return response.data;
  }
);

//function: Get Rank Categories//
// Async thunk for fetching small categories based on selected large and middle category
export const fetchRankCategories = createAsyncThunk(
  "categories/fetchProductRankCategories",
  async ({ large, middle, small }) => {
    const encodedLarge = encodeURIComponent(large);
    const encodedMiddle = encodeURIComponent(middle);
    const encodedSmall = encodeURIComponent(small);
    const response = await axios.get(
      `${BASE_URL}/category/${encodedLarge}/${encodedMiddle}/${encodedSmall}`
    );
    console.log("fetchRankCategories:", response.data);
    return response.data;
  }
);
//function: fetchData //
// Async thunk for fetching results based on categories and additional parameters
export const fetchData = createAsyncThunk(
  "categories/fetchCategoryResults",
  async ({ large, middle, small, rank, startDate, endDate, pageNum }) => {
    const encodedLarge = encodeURIComponent(large);
    const encodedMiddle = encodeURIComponent(middle);
    const encodedSmall = encodeURIComponent(small);
    const encodedRank = encodeURIComponent(rank);
    const response = await axios.get(
      `${BASE_URL}/category/${encodedLarge}/${encodedMiddle}/${encodedSmall}/${encodedRank}`,
      {
        params: { startDate, endDate, pageNum },
      }
    );
    console.log("fetchData:", response.data);
    return response.data;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setMiddleCategory: (state, action) => {
      state.selectedMiddle = action.payload;
      state.selectedSmall = "";
      state.selectedRank = "";
    },
    setSmallCategory: (state, action) => {
      state.selectedSmall = action.payload;
      state.selectedRank = "";
    },
    setRankCategory: (state, action) => {
      state.selectedRank = action.payload;
    },

    clearCategories: (state) => {
      state.middleCategoryList = [];
      state.smallCategoryList = [];
      state.rankCategoryList = [];
      state.selectedMiddle = "";
      state.selectedSmall = "";
      state.selectedRank = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMiddleCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMiddleCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.middleCategoryList = action.payload.list;
      })
      .addCase(fetchMiddleCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSmallCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSmallCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.smallCategoryList = action.payload.list;
      })
      .addCase(fetchSmallCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchRankCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRankCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.rankCategoryList = action.payload.list;
      })
      .addCase(fetchRankCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.dataList = action.payload; // Assuming payload contains the product list
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setMiddleCategory, setSmallCategory, setRankCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
