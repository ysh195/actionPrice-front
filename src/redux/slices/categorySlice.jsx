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
    const response = await axios.get(`${BASE_URL}/category/${large}`);
    console.log("fetchMiddleCategories:", response.data);
    return response.data;
  }
);

//function: Get Small Category List //
export const fetchSmallCategories = createAsyncThunk(
  "categories/fetchMiddleCategories",
  async ({ large, middle }) => {
    const response = await axios.get(`${BASE_URL}/category/${large}/${middle}`);
    console.log("fetchSmallCategories:", response.data);

    return response.data;
  }
);


//function: Get Rank Categories//
export const fetchRankCategories = createAsyncThunk(
  "categories/fetchProductRankCategories",
  async ({ large, middle, small }) => {
    const response = await axios.get(
      `${BASE_URL}/category/${large}/${middle}/${small}`
    );
    console.log("fetchRankCategories:", response.data);
    return response.data;
  }
);


//function: fetchData //
export const fetchData = createAsyncThunk(
  "categories/fetchCategoryResults",
  async ({ large, middle, small, rank, startDate, endDate, pageNum }) => {
    const response = await axios.get(
      `${BASE_URL}/category/${large}/${middle}/${small}/${rank}`,
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
        state.dataList = action.payload.list;
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
