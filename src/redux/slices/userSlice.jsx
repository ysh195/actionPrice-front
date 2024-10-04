/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  users:[],
  error:''

};

export const fetchUsers = createAsyncThunk("user/fectUsers", async() =>{
  return await axios
  .get("https://jsonplaceholder.typicode.com/users")
 .then((response) => response.data)
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

  },
  extraReducers:(builder) =>{
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const {} = userSlice.actions;

export default userSlice.reducer;
