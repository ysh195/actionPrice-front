import React, { useContext, useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

import { dropMenu, icons } from "../../assets/assest";
import { Link } from "react-router-dom";
import SubMenu from "./SubMenu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [user, setUser] = useState({});

  const ACCESS_TOKEN = localStorage.getItem("accessToken");

  const handleLogout = async () => {
    localStorage.clear();
  };

  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="header">
      <div className="wrapper">
        <div className="logo">
          <Link to="/">
            <img className="logo" src={icons.logo} alt="" />
          </Link>
        </div>
        {/* if openMenu is true, add active class here */}
        <div className={`shadow ${openMenu && "active"}`} />
        <ul className={`navigation ${openMenu && "active"}`}>
          <span className="close_menu" onClick={() => setOpenMenu(false)}>
            <FaTimes />
          </span>
          {dropMenu.map((menu, index) => (
            <li key={index} className="list_menu">
              <div className="nav_menu">
                <a href={menu.path}>{menu.title}</a>
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
        <div>
          <Link to="/my-page">
            <img className="user_icon" src={icons.user} alt="" />
          </Link>
          <div className="dropdown_menu">
            <MdKeyboardArrowDown />
          </div>
        </div>
        {/* {!ACCESS_TOKEN ? (
          <button onClick={() => setShowLogin(true)}>Login</button>
        ) : (
          <div className="navbar-profile">
            <img src={""} alt="" />
            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                {" "}
                <img src={""} alt="" /> <p>Orders</p>
              </li>
              <hr />
              <li onClick={handleLogout}>
                {" "}
                <img src={""} alt="" /> <p>로그아웃</p>
              </li>
            </ul>
          </div> */}
        {/* )}
        ; */}
      </div>
    </div>
  );
};

export default Header;
