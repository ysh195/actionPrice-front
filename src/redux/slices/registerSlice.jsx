/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  username: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
  successMessage: "",
  token: "",
  isUsernameAvailable: true,
};

const BASE_URL = "http://localhost:8080/api";

//function:  user register  //
export const registerUser = createAsyncThunk(
  "auth/register",

  async (formData, { rejectWithValue }) => {
    console.log("Slice formData:", formData);
    try {
      // console.log("Payload sent to API:", {formData});

      const response = await axios.post(
        `${BASE_URL}/user/register`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Registration successful:", response.data);
      console.log(response);
      return response.data;
      
    } catch (error) {
      console.error("Registration error:", error);
      return rejectWithValue(
        error.response?.data ||
          error.message ||
          "오류가 발생했습니다. 다시 시도해 주세요."
      );
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload)
        state.username = action.payload.username;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Registration failed";
      });
  },
});

export const { } = registerSlice.actions;
export default registerSlice.reducer;
