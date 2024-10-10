// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import React from "react";
// import "./Navbar.css";
// import {icons} from "../assets/assest"

// import { Link } from "react-router-dom";

// const Navbar = ({ setShowLogin }) => {
//   return (
//     <div className="navbar">
//       <Link to="/">
//         <img className="logo" src={icons.logo} alt="" />
//       </Link>
//       <ul className="navbar-menu">
//         <Link to="/">home</Link>
//         <Link to="/api/categories">Category</Link>
//         <Link to="/api/contact-us">ContactUs</Link>
//       </ul>
//       <div className="navbar-right">
//         <Link to="/api/favs" className="navbar-fav-icon"></Link>

//         <Link to="/api/user/login">
//           <button>로그인 </button>{" "}
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
// src/Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Make sure to have your CSS styles here
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/slices/authSlice";

const Navbar = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token); // Assuming `user` is set upon successful login

  const handleLogin = () => {
    dispatch(login(FormData));
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("access_token");
    localStorage.removeItem("username")
    navigate("/api/user/login"); // Redirect to logout endpoint
   
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
        {token ? (
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
