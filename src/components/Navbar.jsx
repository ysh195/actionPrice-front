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
import { Link } from "react-router-dom";
import "./Navbar.css"; // Make sure to have your CSS styles here

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Simulate a login action
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Simulate a logout action
    setIsLoggedIn(false);
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
          <Link to="/about">About</Link>
        </li>
      </ul>
      <div className="auth-buttons">
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="api/user/login">
            <button onClick={handleLogin}>Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
