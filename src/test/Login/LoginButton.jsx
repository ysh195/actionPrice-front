/* eslint-disable react/prop-types */
import React from "react";

const LoginButton = ({ isLoading }) => (
  <button
    type="submit"
    style={{
      width: "100%",
      padding: "0.5rem",
      backgroundColor: "#C5705D",
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
