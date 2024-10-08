import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");

/** CREATE CUSTOM AXIOS INSTANCE */
export const AuthApi = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
  },
});


/** LOGIN API */
export const login = async ({ username, password }) => {
    const user_data = { username, password };
    const response = await AuthApi.post(`/user/login`, user_data);
    return response.data;
}

/** SIGNUP API */
export const register = async ({ username, email, password }) => {
    const user_data = { username, email, password };
    const response = await AuthApi.post(`/user/register`, user_data);
    return response.data;
}
