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

  async (
    { username, password, email, verificationCode },
    { rejectWithValue }
  ) => {
    // console.log("Form Data:", formData);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/register",
        //
        JSON.stringify(username, password, email, verificationCode),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Registration successful:", response.data);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      // Handle API errors and return a meaningful message
      if (error.response && error.response.data) {
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
