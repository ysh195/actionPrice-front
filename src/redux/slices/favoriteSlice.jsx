import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  favoriteList: [],
  loading: false,
  error: null,
  currentPageNum: 0,
  totalPageNum: 0,
  listSize: 0,
};

const API_URL = "http://localhost:8080/api";

//function: create Favorite //
export const createFavorite = createAsyncThunk(
  "favorite/createFavorite",
  async (
    { large, middle, small, rank, logined_username, favorite_name },
    { rejectWithValue }
  ) => {
    let access_Token = localStorage.getItem("access_token");
     if (!access_Token) {
       alert("You need to log in to write a post.");
       return rejectWithValue("User not logged in");
     }

    try {
           const response = await axios.post(
        `${API_URL}/category/${large}/${middle}/${small}/${rank}/favorite`,
        { logined_username, favorite_name },
        {
          headers: {
            Authorization: `Bearer ${access_Token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
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
      let access_Token = localStorage.getItem("access_token");
      const response = await axios.post(
        `${API_URL}/category/favorite/${favoriteId}/delete`, {},
        {
          headers: {
            Authorization: `Bearer ${access_Token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
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
      let access_Token = localStorage.getItem("access_token");
      const response = await axios.get(
        `${API_URL}/mypage/${username}/wishlist`,
        {
          headers: {
            Authorization: `Bearer ${access_Token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
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
