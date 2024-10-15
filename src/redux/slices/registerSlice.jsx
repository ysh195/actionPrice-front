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

//function:  user register  //
export const registerUser = createAsyncThunk(
  "auth/register",

  async (formData, { rejectWithValue }) => {
    console.log("Slice formData:", formData);
    try {
      // console.log("Payload sent to API:", {formData});

      const response = await axios.post(
        "http://localhost:8080/api/user/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Registration successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      // Handle API errors and return a meaningful message
      if (error.response && error.response.data) {
        console.error("Response data:", error.response.data); // Log the response data for debugging
        return rejectWithValue(error.response.data); // API error response
      }
      return rejectWithValue(error.message); // General error
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    clearMessages(state) {
      state.errorMessage = null;
      state.successMessage = null;
    },
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
        console.log(action.payload.data);
        state.user = action.payload.data;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Registration failed";
      });
  },
});

export const { clearMessages } = registerSlice.actions;
export default registerSlice.reducer;
