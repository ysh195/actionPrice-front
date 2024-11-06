/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { goLogin } from "../redux/slices/loginSlice";
// Assuming you're using Redux

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authToken =
    useSelector((state) => state.login.access_token) ||
    localStorage.getItem("access_token");

  useEffect(() => {
    if (!authToken) {
      // navigate("/api/user/login");
      dispatch(goLogin());
      
    }
  }, [authToken, navigate]);

  return authToken ? element : null;
};

export default ProtectedRoute;
