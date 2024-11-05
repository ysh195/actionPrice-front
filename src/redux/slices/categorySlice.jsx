/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  middleCategoryList: [],
  smallCategoryList: [],
  rankList: [],
  productList: [],
  selectedMiddle: "",
  selectedSmall: "",
  selectedRank: "",
  loading: false,
  error: "",
  totalPageNum: 0,
  downloadMessage: null,
};

const BASE_URL = "http://localhost:8080/api";

//function: Get Middle Category List //
export const fetchMiddleCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (large) => {
    const response = await axios.get(`${BASE_URL}/category/${large}`);

    return response.data;
  }
);

//function: Get Small Category List //
export const fetchSmallCategories = createAsyncThunk(
  "categories/fetchMiddleCategories",
  async ({ large, middle }) => {
    const response = await axios.get(`${BASE_URL}/category/${large}/${middle}`);

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

//function: fetchProductList //
export const fetchProductList = createAsyncThunk(
  "categories/fetchCategoryResults",
  async ({ large, middle, small, rank, startDate, endDate, pageNum = 0 }) => {
    const response = await axios.get(
      `${BASE_URL}/category/${large}/${middle}/${small}/${rank}`,
      {
        params: { startDate, endDate, pageNum },
      }
    );
    console.log("fetchProductList:", response.data);
    return response.data;
  }
);

//function: download excel //
export const downloadExcel = createAsyncThunk(
  "download/downloadExcel",
  async (
    { large, middle, small, rank, startDate, endDate, pageNum },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `/api/category/${large}/${middle}/${small}/${rank}/excel`,
        {
          params: { startDate, endDate, pageNum },
          responseType: "blob", // Important for handling binary data
        }
      );

      // Trigger download after the blob is received
      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "transaction_history.xlsx"); // Set filename
      document.body.appendChild(link);
      link.click();
      // Clean up the URL after download
      link.remove();
      // link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      return "Download successful";
    } catch (error) {
      console.error("Download failed:", error);

      return rejectWithValue("Failed to download Excel file");
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearProductList: (state) => {
      state.productList = [];
    },
    resetDownloadState: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
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
        console.log("smallCategoryList:", action.payload.list);
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
        state.rankList = action.payload.list;
      })
      .addCase(fetchRankCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductList.fulfilled, (state, action) => {
        state.loading = false;
        state.productList = action.payload.transactionHistoryList;
        state.totalPageNum = action.payload.totalPageNum;
      })
      .addCase(fetchProductList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(downloadExcel.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.downloadMessage = null;
      })
      .addCase(downloadExcel.fulfilled, (state, action) => {
        state.loading = false;
        state.downloadMessage = action.payload;
      })
      .addCase(downloadExcel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductList } = categorySlice.actions;

export default categorySlice.reducer;
