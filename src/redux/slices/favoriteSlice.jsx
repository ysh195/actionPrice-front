import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../apiConfig";

const initialState = {
  favoriteList: [],
  loading: false,
  error: null,
  currentPageNum: 0,
  totalPageNum: 0,
  listSize: 0,
};

//function: create Favorite //
export const createFavorite = createAsyncThunk(
  "favorite/createFavorite",
  async (
    { large, middle, small, rank, logined_username, favorite_name },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosPrivate.post(
        `/category/${large}/${middle}/${small}/${rank}/favorite`,
        { logined_username, favorite_name }
      );
      console.log("createFavorite response:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);

//function: delete Favorite //
export const deleteFavorite = createAsyncThunk(
  "favorite/deleteFavorite",
  async (favoriteId, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        `/category/favorite/${favoriteId}/delete`,
        {}
      );
      if (response.data.status === "success") {
        return favoriteId; // Return favoriteId for updating the state
      } else {
        console.log("deleteFavorite:", response.data);
        return rejectWithValue(response.data); // Handle failure response
      }
    } catch (error) {
      console.error("Failed to delete favorite:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

//functions for fetchWishlist //
export const fetchFavoriteList = createAsyncThunk(
  "user/fetchFavoriteList",
  async (username, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(`/mypage/${username}/wishlist`);
      console.log("fetchFavoriteList:", response.data);

      return response.data; // Return the fetched wishlist data
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFavorite.fulfilled, (state, action) => {
        state.loading = false;

        // state.favoriteList.push(action.payload);
        state.favoriteList = Array.isArray(action.payload)
          ? [...action.payload] // Use spread to ensure it's a fresh array
          : [];
      })
      .addCase(createFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteFavorite.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Remove the deleted favorite from the list by filtering out the favoriteId
        state.favoriteList = state.favoriteList.filter(
          (fav) => fav.id !== action.payload
        );
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchFavoriteList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavoriteList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.favoriteList = action.payload; // Store fetched wishlist data in state
      })
      .addCase(fetchFavoriteList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
// export const {} = favoriteSlice.actions;

export default favoriteSlice.reducer;
