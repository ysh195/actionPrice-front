import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  loading: false,
  error: false,
  email: "",
  username: "",
  myPosts: [],
  totalPageNum: 0,
  currentPageNum: 1,
  favoriteList: [],
};

const BASE_URL = "http://localhost:8080/api";

//functions for deleteAccount //
export const deleteAccount = createAsyncThunk(
  "user/deleteUser",
  async (username, { rejectWithValue }) => {
    try {
      const access_Token = localStorage.getItem("access_token");
      if (!access_Token) {
        alert("You need to log in to delete your account.");
        return rejectWithValue("User not logged in");
      }
      const response = await axios.post(
        `${BASE_URL}/mypage/${username}/deleteUser`,
        { username },
        {
          headers: {
            Authorization: `Bearer ${access_Token}`,
          },
        }
      );

      console.log("delete user response:", response);
      if (response.status === 200) {
        console.log("delete account successful");

        Cookies.remove("REMEMBERME");
        localStorage.removeItem("access_token");
        localStorage.removeItem("username");

        return response.data;
      } else {
        // Handle unexpected status
        return rejectWithValue("계정 삭제에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error deleting account"
      );
    }
  }
);
//functions for getPersonalInfo //
export const getPersonalInfo = createAsyncThunk(
  "user/personalInfo",
  async (username, { rejectWithValue }) => {
    const access_Token = localStorage.getItem("access_token");

    try {
      const response = await axios.get(
        `${BASE_URL}/mypage/${username}/personalinfo`,
        {
          headers: {
            Authorization: `Bearer ${access_Token}`,
          },
        }
      );
      console.log("personalInfo response:", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching personal info"
      );
    }
  }
);
//functions for getMyPosts //
export const getMyPosts = createAsyncThunk(
  "posts/getMyPosts",
  async ({ username, keyword = "", pageNum = 0 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/mypage/${username}/myposts`,
        {
          params: {
            keyword,
            pageNum,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log("getMyPosts response:", response.data);
      return response.data;
    } catch (error) {
      console.log("getMyPosts error:", error);
      return rejectWithValue(error.response?.data || "Error fetching posts");
    }
  }
);
//functions for fetchWishlist //
export const fetchWishlist = createAsyncThunk(
  "user/fetchWishlist",
  async ( username ) => {
    const response = await axios.get(`${BASE_URL}/mypage/${username}/wishlist`);
    console.log("fetchWishlist:", response.data);
    return response.data; // Assuming the response contains the wishlist
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to add a favorite product
    addFavorite: (state, action) => {
      const product = action.payload; // The product is passed as payload
      // Prevent duplicates by checking if the product already exists
      if (!state.favoriteList.find((fav) => fav.delId === product.id)) {
        state.favoriteList.push(product);
      }
    },
    // Action to remove a favorite product
    removeFavorite: (state, action) => {
      // Remove the product from favorites by filtering
      state.favoriteList = state.favoriteList.filter(
        (fav) => fav.delId !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteAccount.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(deleteAccount.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getPersonalInfo.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error state on new fetch
      })
      .addCase(getPersonalInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload.email;
      })
      .addCase(getPersonalInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
      })
      .addCase(getMyPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.myPosts = action.payload.postList;
        state.currentPageNum = action.payload.currentPageNum;
        state.totalPageNum = action.payload.totalPageNum;
      })
      .addCase(getMyPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        console.log("fetchWishlist slice:", action.payload);
        state.favoriteList = action.payload; // Set the wishlist items
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { addFavorite, removeFavorite } = userSlice.actions;

export default userSlice.reducer;
