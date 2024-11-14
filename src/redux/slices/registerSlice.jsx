/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPublic } from "../apiConfig";

const initialState = {
  user: null,
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

      const response = await axiosPublic.post(`/user/register`, formData);
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Registration failed";
      });
  },
});

export const {} = registerSlice.actions;
export default registerSlice.reducer;
