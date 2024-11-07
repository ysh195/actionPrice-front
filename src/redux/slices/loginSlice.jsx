import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  username: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
  isLoggedIn: false,
  access_token: null,
  role: "",
  redirectStatus: "",
};

const BASE_URL = "http://localhost:8080/api";

//function for login (POST request) //
export const login = createAsyncThunk(
  "auth/login",

  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/login`,
        formData,

        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // Setting Authorization header globally
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;

      if (!response.data.access_token) {
        return rejectWithValue("로그인에 실패했습니다. 정보를 확인하세요.");
      }
      console.log("Login Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Login Error:", error);
      const errorMsg =
        error.response?.data?.message ||
        "로그인에 실패했습니다. 정보를 확인하세요.";

      return rejectWithValue(errorMsg);
    }
  }
);

// export const goLogin = createAsyncThunk(
//   "user/goLogin",
//   async (navigate, { rejectWithValue }) => {
//     const access_token = localStorage.getItem("access_token");

//     if (access_token) {
//       // If access token exists, the user is already logged in, reject and prevent further navigation
//       return rejectWithValue("이미 로그인된 상태입니다."); // Returning the reject value for already logged-in users
//     }
//     try {
//       const response = await axios.get(`${BASE_URL}/user/goLogin`);

//       if (response.data === "goLogin") {
//         navigate("/api/user/login");
//       }
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response ? error.response.data : "An error occurred"
//       );
//     }
//   }
// );

//function for logoutUser (POST request) //

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      //todo check axios.get for the logout
      const response = await axios.post(`${BASE_URL}/user/logout`);
      console.log("logoutUser response status:", response.status);

      if (response.status === 200) {
        localStorage.clear();
        axios.defaults.headers.common["Authorization"] = null;
        console.log("Logout successful");
        return response.data;
      } else {
        // Handle unexpected status
        return rejectWithValue("로그아웃에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout error
      return rejectWithValue(
        error.response?.data || "로그아웃에 실패했습니다."
      );
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    autoLogin: (state) => {
      const access_token = localStorage.getItem("access_token");
      const username = localStorage.getItem("username");

      console.log("checking if there's token:", access_token);
      if (access_token) {
        state.isLoggedIn = true;
        state.access_token = access_token;
        state.username = username;
      }
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;

        state.username = action.payload.username;
        state.role = action.payload.role;
        state.access_token = action.payload.access_token;
        localStorage.setItem("username", action.payload.username);
        localStorage.setItem("access_token", action.payload.access_token);
        localStorage.setItem("role", action.payload.role);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false; // Update login status
        state.isError = null; // Clear any errors
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.errorMessage = action.payload; // Set the error message
      });
    // .addCase(goLogin.pending, (state) => {
    //   state.isLoading = true;
    //   state.isError = null;
    // })
    // .addCase(goLogin.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.redirectStatus = action.payload;
    // })
    // .addCase(goLogin.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = action.payload || "An error occurred";
    // });
  },
});

export const { autoLogin } = loginSlice.actions;
export default loginSlice.reducer;
