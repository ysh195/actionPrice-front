/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { colors } from "../../assets/assest";

const LoginButton = ({ isLoading }) => (
  <button
    type="submit"
    style={{
      width: "100%",
      padding: "0.5rem",
      backgroundColor: colors.tableHead,
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      opacity: isLoading ? 0.5 : 1,
    }}
    disabled={isLoading}
  >
    {isLoading ? "Loading..." : "Login"}
  </button>
);

export default LoginButton;
