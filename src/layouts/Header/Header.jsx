import React, { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { dropMenu, icons } from "../../assets/assest";
import SubMenu from "./SubMenu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const ACCESS_TOKEN = localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/"); // Redirect to home after logout
  };

  return (
    <div className="header">
      <div className="wrapper">
        <div className="logo">
          <Link to="/">
            <img className="logo" src={icons.logo} alt="Logo" />
          </Link>
        </div>
        <div className={`shadow ${openMenu ? "active" : ""}`} />
        <ul className={`navigation ${openMenu ? "active" : ""}`}>
          <span className="close_menu" onClick={() => setOpenMenu(false)}>
            <FaTimes />
          </span>
          {dropMenu.map((menu, index) => (
            <li key={index} className="list_menu">
              <div className="nav_menu">
                <Link to={menu.path}>{menu.title}</Link>
                {menu.subMenu && (
                  <span className="menu_icon">
                    <MdKeyboardArrowDown />
                  </span>
                )}
              </div>
              {menu.subMenu && (
                <div className="sub_menu">
                  <SubMenu menu={menu} />
                </div>
              )}
            </li>
          ))}
        </ul>
        <span className="bar_menu" onClick={() => setOpenMenu(true)}>
          <FaBars />
        </span>
        <div className="user-menu">
          <Link to="/my-page">
            <img className="user_icon" src={icons.user} alt="User" />
          </Link>
          <div className="dropdown_menu">
            <MdKeyboardArrowDown />
          </div>
          {ACCESS_TOKEN ? (
            <div className="navbar-profile">
              <ul className="navbar-profile-dropdown">
                <li onClick={() => navigate("/myorders")}>
                  <img src={icons.ordersIcon} alt="Orders" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={handleLogout}>
                  <img src={icons.logoutIcon} alt="Logout" />
                  <p>로그아웃</p>
                </li>
              </ul>
            </div>
          ) : (
            <button >Login</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
