/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import Dropdown from "./Dropdown";
import { icons } from "../assets/assest";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img className="nav-logo" src={icons.logo} alt="" />
      </Link>
      <div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>
          <li
            className="nav-item"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link to="/category" className="nav-links">
              Category /카테고리 <i className="fas fa-caret-down" />
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li className="nav-item">
            <Link to="/contact-us" className="nav-links">
              Contact Us
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/authentication" className="nav-links">
              로그인
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
