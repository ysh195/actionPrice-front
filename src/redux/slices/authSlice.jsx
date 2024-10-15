import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/user/validate",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Assuming your backend returns user info
    } catch (error) {
      return thunkAPI.rejectWithValue("Authentication failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null; // Clear error on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload; // Set the authenticated user data
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload; // Handle the error
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
