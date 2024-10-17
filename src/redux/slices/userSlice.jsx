import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
};

const BASE_URL = "http://localhost:8080/api";

export const withdrawMembership = createAsyncThunk(
  "user/withdrawMembership",
  async ({ password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/withdraw`, {
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(withdrawMembership.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(withdrawMembership.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default userSlice.reducer;
