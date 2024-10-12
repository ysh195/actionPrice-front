import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Make sure to have your CSS styles here
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/slices/loginSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = useSelector((state) => state.login.username); // Assuming `user` is set upon successful login

  const handleLogin = () => {
    dispatch(login(FormData));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/api/user/login"); 
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">MyApp</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/api/categories">Category</Link>
        </li>
        <li>
          <Link to="/api/contact-us">Contact Us</Link>
        </li>
      </ul>
      <div className="auth-buttons">
        {username ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/api/user/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
